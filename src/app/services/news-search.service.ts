import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsSearchService {

  constructor(
    private http: HttpClient
  ) { }

  // https://newsapi.org/v2/everything?language=en&searchIn=title,description&pageSize=20&apiKey=6babce9602e74985ae5a69d08718eeea
  searchResults = new Subject()

  getResults(value: {url: string, queryParams: HttpParams}): any {
    return this.http.get(value.url,{
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
      params: value.queryParams,
    });
  }

  passResults(results: any):void {
    this.searchResults.next(results)
    console.log('from pass results:\n', results)
  }

  getPassedResults(): Observable<any> {
    //return this.searchResults.asObservable()
    return this.searchResults
  }
}
