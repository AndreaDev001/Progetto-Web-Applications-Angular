import {Component, OnInit} from '@angular/core';
import {UrlBuilderService} from "../services/url-builder.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NewsSearchService} from "../services/news-search.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  constructor(
    private urlBuilder: UrlBuilderService,
    private newsSearchService: NewsSearchService
  ) {}

  ngOnInit(): void {
    this.subscribeToNews(this.urlBuilder.buildUrl())
    this.urlBuilder.resetUrl();
  }

  keywords: string[] = [];

  updateKeywords(newKeywords: string) {
    this.keywords = newKeywords.split(/\s+/);
    console.log("new keywords: ", this.keywords)  // todo: debug
    // todo: resetta numero di apgina corrente (la nuova ricerca deve partire da pag 1)
    this.search()

  }

  subscribeToNews(value: {url: string, queryParams: HttpParams}): void {
    this.newsSearchService.getResults(value).subscribe(
      (response: any) => {
        console.log('Data from newsCompnent subscribeToNews():\n', response)
        this.newsSearchService.passResults({
          results: response.articles,
          totalResults: response.totalResults
        })
      }
      // todo: gestisci errori
    )
  }

  search() {
    this.urlBuilder.addKeywords(this.keywords)

    var url = this.urlBuilder.buildUrl()

    this.subscribeToNews(url)
    this.urlBuilder.resetUrl()
  }
}
