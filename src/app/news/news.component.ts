import {Component, OnInit} from '@angular/core';
import {UrlBuilderService} from "../services/url-builder.service";
import {HttpParams} from "@angular/common/http";
import {NewsSearchService} from "../services/news-search.service";
import {DateRange, Sorting} from "../enum";
import {SpinnerService} from "../services/spinner.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  constructor(
    private urlBuilder: UrlBuilderService,
    private newsSearchService: NewsSearchService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.subscribeToNews(this.urlBuilder.buildUrl())
    this.urlBuilder.resetUrl();
  }

  requestSuccess: boolean = true;

  keywords: string[] = [];
  currentDateRange: DateRange = DateRange.ALL;
  currentSorting: Sorting = Sorting.LATEST;
  currentPage: number = 1;

  updateKeywords(newKeywords: string) {
    this.keywords = newKeywords.split(/\s+/);
    console.log("new keywords: ", this.keywords)  // todo: debug
    this.resetCurrentPage()
    this.search()
  }

  updateDateRange(dateRange: DateRange) {
    this.currentDateRange = dateRange
    this.resetCurrentPage()
    this.search()
  }


  updateSorting(sorting: Sorting) {
    this.currentSorting = sorting
    this.resetCurrentPage()
    this.search()
    console.warn("sorting: ", sorting)  // todo: debug
  }

  updateCurrentPage(newCurrentPage: number): void {
    this.currentPage = newCurrentPage
    this.search()
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
  }

  resetCurrentPage(): void {
    this.currentPage = 1
  }

  subscribeToNews(value: {url: string, queryParams: HttpParams}): void {
    this.newsSearchService.getResults(value).subscribe(
      (response: any) => {
        console.log('Data from newsCompnent subscribeToNews():\n', response)
        this.newsSearchService.passResults({
          results: response.articles,
          totalResults: response.totalResults
        })
        this.requestSuccess = true
      },
      (error: any) => {
        this.requestSuccess = false
      }
    )
  }

  search() {
    this.urlBuilder.addKeywords(this.keywords)
    this.urlBuilder.addDateFilter(this.currentDateRange)
    this.urlBuilder.addSorting(this.currentSorting)
    this.urlBuilder.addCurrentPage(this.currentPage)

    var url = this.urlBuilder.buildUrl()

    this.subscribeToNews(url)
    this.urlBuilder.resetUrl()
  }
}
