import {Component, OnInit} from '@angular/core';
import {NewsSearchService} from "../services/news-search.service";

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.css']
})

export class NewsResultsComponent implements OnInit {
  constructor(
    private newsSearchService: NewsSearchService
  ) {}

  results: any[] = [];
  totalResults = 0;

  ngOnInit(): void {
    this.newsSearchService.getPassedResults().subscribe(
      (response: any) => {
        this.results = response.results;
        this.totalResults = response.totalResults;
      }
    )
  }
}
