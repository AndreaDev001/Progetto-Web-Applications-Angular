import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsSearchService} from "../../services/news-search.service";

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.css']
})

export class PageNavigationComponent implements OnInit {
  @Output() currentPageChanged = new EventEmitter<number>()

  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  @Input() currentPage: number = 1;

  constructor(
    private newsSearchService: NewsSearchService
  ) {}

  totalResults: number = 0;
  newsPerPage: number = 20;
  currentLastPage: number = 1;
  pages: number[] = []

  ngOnInit() {
    this.newsSearchService.getPassedResults().subscribe(
      (response: any) => {
        this.totalResults = (response.totalResults > 100) ? 100 : response.totalResults // posso ricevere max 100 risultati per ricerca all'API
        if (this.totalResults % this.newsPerPage === 0) {
          this.currentLastPage = this.totalResults / this.newsPerPage
        }
        else {
          this.currentLastPage = Math.floor(this.totalResults / this.newsPerPage) + 1
        }

        // riempio pages
        if (this.pages.length != 0) {
          this.pages = []
        }
        for (let i = 1; i <= this.currentLastPage; ++i) {
          this.pages.push(i)
        }

        // first page
        if (this.currentPage === 1) {
          this.isFirstPage = true
        }
        else { this.isFirstPage = false }

        // last page
        if (this.currentPage == this.currentLastPage) {
          this.isLastPage = true
        }
        else { this.isLastPage = false }


      }
    )
  }

  loadNextPage() {
    this.currentPage++
    this.currentPageChanged.emit(this.currentPage)
  }

  loadPreviousPage() {
    this.currentPage--
    this.currentPageChanged.emit(this.currentPage)
  }

  loadPage(page: number): void {
    this.currentPage = page
    this.currentPageChanged.emit(this.currentPage)
  }
}
