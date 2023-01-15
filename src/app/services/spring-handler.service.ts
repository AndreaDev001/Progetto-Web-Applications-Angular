import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Review} from "../interfaces";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class SpringHandlerService {

  private readonly url: string = "http://localhost:8080";
  constructor(private httpClient: HttpClient) {

  }
  public getAllReviews(gameId: number): Observable<Review[]>{
    const desiredURL = this.url + "/getReviews?" + "gameId=" + gameId;
    return this.httpClient.post<Review[]>(desiredURL,{});
  }
  public getUrl(): string {return this.url;}
}
