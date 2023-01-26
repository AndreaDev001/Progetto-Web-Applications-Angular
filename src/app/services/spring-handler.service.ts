import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Review, Utente} from "../interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SpringHandlerService {

  private readonly url: string = "http://localhost:8080";
  private currentSessionID: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
  private currentUsername: BehaviorSubject<Utente | undefined> = new BehaviorSubject<Utente | undefined>(undefined);

  constructor(private httpClient: HttpClient,private route: ActivatedRoute) {
    this.route.queryParams.subscribe((value: any) => {
      console.log(value['jsessionid']);
      let sessionID: string = value['jsessionid'];
      this.currentSessionID.next(sessionID);
      this.getUser(sessionID);
    })
  }
  private getUser(sessionID: string): void{
    const desiredURL: string = this.url + "/getUser";
    let params: HttpParams = new HttpParams();
    params = params.append("jsessionid",sessionID);
    this.httpClient.get<Utente>(desiredURL,{params: params}).subscribe((value: Utente) => this.currentUsername.next(value));
  }
  public addGame(gameID: number,genre: string,name: string,img: string): Observable<any>{
    const desiredURL: string = this.url + "/addGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    params = params.append("genere",genre);
    params = params.append("titolo",name);
    params = params.append("immagine",img);
    return this.httpClient.post(desiredURL,{},{params: params});
  }
  public existsGame(gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/containsGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.get(desiredURL,{params: params});
  }
  public removeGame(gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/removeGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.post(desiredURL,{},{params: params});
  }
  public getGame(gameID: number): Observable<any> {
    const desiredURL: string = this.url + "/getGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.get(desiredURL,{params: params});
  }
  public getUserReview(username: string,gameID: number): Observable<Review>{
    const desiredURL: string = this.url + "/getUserReview";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.get<Review>(desiredURL,{params: params});
  }
  public getUserReviews(username: string): Observable<Review[]>{
    const desiredURL: string = this.url + "/getUserReviews";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    return this.httpClient.get<Review[]>(desiredURL,{params: params});
  }
  public addGameWishlist(username: string,gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/addGameWishlist";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.post(desiredURL,{},{params: params});
  }
  public removeGameWishlist(username: string,gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/removeGameWishlist";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.post(desiredURL,{},{params: params});
  }
  public containsGameWishlist(username: string,gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/containsGameWishlist";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.get(desiredURL,{
      params: params
    });
  }
  public getReviews(gameID: number): Observable<Review[]>{
    const desiredURL: string =  this.url + "/getReviews";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.get<Review[]>(desiredURL,{
      params: params
    })
  }
  public performLogout(): void{
    const desiredURL: string = this.url + "/logout";
    this.currentUsername.next(undefined);
    this.currentSessionID.next(undefined);
    this.httpClient.post(desiredURL,{});
  }
  public getParams(): Params{
    return {jsessionid: this.currentSessionID.value};
  }
  public getSessionID(value: boolean): any {return value ? this.currentSessionID.value : this.currentSessionID};
  public getCurrentUsername(value: boolean): any {return value ? this.currentUsername.value : this.currentUsername};

}
