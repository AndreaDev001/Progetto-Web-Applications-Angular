import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Review} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class SpringHandlerService {

  private readonly url: string = "http://localhost:8080";
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentSessionID: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
  private currentUsername: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);

  constructor(private httpClient: HttpClient) {

  }
  public getUser(sessionID: string): Observable<any>{
    const desiredURL: string = this.url + "/getUser";
    let params: HttpParams = new HttpParams();
    params = params.append("jsessionid",sessionID);
    return this.httpClient.get(this.url,{
      params: params,
      responseType: 'text'
    });
  }
  public addGame(gameID: number,genre: string): Observable<any>{
    const desiredURL: string = this.url + "/addGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    params = params.append("genere",genre);
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
  public getUserReview(username: string,gameID: number): Observable<Review>{
    const desiredURL: string = this.url + "/getUserReview";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.get<Review>(desiredURL,{params: params});
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
  public forceLogin(username: string,password: string): Observable<any>{
    const desiredURL: string = this.url + "/doLogin";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("password",password);
    let observable: Observable<any> = this.httpClient.post(desiredURL,{},{params: params});
    observable.subscribe((value: any) => {
      if(value[0] != undefined)
      {
        this.isLogged.next(true);
        this.currentSessionID.next(value[0]);
        this.currentUsername.next(value[1]);
      }
    })
    return observable;
  }
  public getIsLogged(value: boolean): any {return value ? this.isLogged.value : this.isLogged};
  public getSessionID(value: boolean): any {return value ? this.currentSessionID.value : this.currentSessionID};
  public getCurrentUsername(value: boolean): any {return value ? this.currentUsername.value : this.currentUsername};

}
