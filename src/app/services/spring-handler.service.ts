import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Review, Utente} from "../interfaces";
import {query} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SpringHandlerService {

  private readonly url: string = "http://localhost:8080";
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentSessionId: string = "";
  constructor(private httpClient: HttpClient,private route: ActivatedRoute) {

  }
  public getAllReviews(gameId: number): Observable<Review[]> {
    const desiredURL = this.url + "/getReviews?" + "gameID=" + gameId;
    return this.httpClient.get<Review[]>(desiredURL,{});
  }
  public forceLogin(username: string,password: string): void {
    const desiredURL = this.url + "/doLogin?" + "username=" + username + "&password="+password;
    this.httpClient.post(desiredURL,{},{responseType: 'text'}).subscribe((value: any) => {
      if(value != "")
         this.isLogged.next(value != "");
      this.currentSessionId = value;
    });
  }
  public getUser(sessionId: string): Observable<any> {
    const desiredURL = this.url + "/getUser?" + "jsessionid=" + sessionId;
    return this.httpClient.get(desiredURL, {
      responseType: 'text'
    });
  }
  public getUserReview(username: string,gameID: number): Observable<Review>{
    const desiredURL = this.url + "/getUserReview?" + "username=" + username + "&"+ "gameID=" + gameID;
    return this.httpClient.get<Review>(desiredURL,{});
  }
  public isAuth(sessionId: string) : Observable<any>{
    const desiredURL = this.url + "/checkAuth?" + "jsessionid=" + sessionId;
    return this.httpClient.get(desiredURL,{});
  }
  public getUrl(): string {return this.url;}
  public IsLogged(value: boolean): any {return value ? this.isLogged.value : this.isLogged};
  public getSessionId(): string {return this.currentSessionId;}
}
