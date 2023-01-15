import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UrlBuilderService {
  newsApiKey: string =  "6babce9602e74985ae5a69d08718eeea";

  defaultUrl: string = "https://newsapi.org/v2/everything?q=videogames&language=en&pageSize=20&";
  baseUrl: string = "https://newsapi.org/v2/everything?language=en&searchIn=title,description&pageSize=20&";
  url: string = this.defaultUrl;

  private httpParams = new HttpParams();

  constructor(
    private http: HttpClient
  ) { }


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

  buildUrl(): string {
    this.httpParams = this.httpParams.append('apiKey', this.newsApiKey)
    console.error(this.httpParams.toString())
    let finalUrl = (this.url + this.httpParams.toString())  // todo: debug
    return finalUrl
  }

  public resetUrl(): void{
    this.url = this.baseUrl;
    this.httpParams = new HttpParams();
  }
}
