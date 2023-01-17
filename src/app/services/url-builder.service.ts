import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import {DateRange, Sorting} from "../enum";

@Injectable({
  providedIn: 'root'
})

export class UrlBuilderService {
  newsApiKey: string =  "6babce9602e74985ae5a69d08718eeea";

  defaultUrl: string = "https://newsapi.org/v2/everything?q=videogames&language=en&pageSize=20";
  baseUrl: string = "https://newsapi.org/v2/everything?language=en&searchIn=title,description&pageSize=20";
  url: string = this.defaultUrl;

  private httpParams = new HttpParams();

  constructor() { }

  initUrl(): void {
    this.url = this.defaultUrl;
  }

  addKeywords(keywords: String[]): void {
    let paramKeywords = "";

    // keywords di default
    if (keywords.length === 0) {
      this.url = this.defaultUrl;
    }
    // keywords dell'utente
    else {
      for (let i = 0; i < keywords.length; i++) {
        if (i != 0) {
          paramKeywords += '+';
        }
        paramKeywords += keywords[i];
      }
    }

    this.httpParams = this.httpParams.append('q', paramKeywords)
  }

  addDateFilter(dateRange: DateRange): void {
    console.error('CIAOOOOOOOO')
    if (dateRange !== DateRange.ALL) {
      var now = new Date();
      console.log("now: " + now)  // todo: debug

      // setting from date:
      var fromDate = new Date();
      switch (dateRange) {
        case DateRange.TODAY:
          fromDate.setDate(now.getDate());
          break;
        case DateRange.THIS_WEEK:
          fromDate.setDate(now.getDate() - 7);
          break;
        case DateRange.THIS_MONTH:
          fromDate.setDate(1);
          fromDate.setMonth(now.getMonth());
          fromDate.setFullYear(now.getFullYear());
          break;
        case DateRange.THIS_YEAR:
          var year = now.getFullYear();
          fromDate.setDate(1);
          fromDate.setMonth(0);
          fromDate.setFullYear(year);
          break;
        default:
          break;
      }

      this.httpParams = this.httpParams.append('from', fromDate.toISOString().substring(0, 10))
      this.httpParams = this.httpParams.append('to', now.toISOString().substring(0, 10))
    }
  }


  addSorting(sortingType: Sorting): void {
    if (sortingType === Sorting.LATEST) {
      this.httpParams = this.httpParams.append('sortBy', 'publishedAt')
    }
    else {
      this.httpParams = this.httpParams.append('sortBy', sortingType)
    }
  }

  addCurrentPage(page: number) {
    this.httpParams = this.httpParams.append('page', page)
  }


  buildUrl(): {url: string, queryParams: HttpParams} {
    this.httpParams = this.httpParams.append('apiKey', this.newsApiKey)
    console.warn(this.httpParams.toString())
    /*
    let finalUrl = (this.url + this.httpParams.toString())  // todo: debug
    return finalUrl

     */

    let finalUrl = {url: this.url, queryParams: this.httpParams}
    return finalUrl
  }

  public resetUrl(): void{
    this.url = this.baseUrl;
    this.httpParams = new HttpParams();
  }
}
