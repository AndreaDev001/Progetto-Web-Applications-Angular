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

  /***
   * Ottiene l'utente relativa a una sessionID
   * @param sessionID La session id appartenente all'utente
   * @private
   */
  private getUser(sessionID: string): void{
    const desiredURL: string = this.url + "/getUser";
    let params: HttpParams = new HttpParams();
    params = params.append("jsessionid",sessionID);
    this.httpClient.get<Utente>(desiredURL,{params: params}).subscribe((value: Utente) => this.currentUsername.next(value),(error: any) => {

    });
  }

  /***
   * Richiede a spring di aggiungere un gioco alla tabella Gioco
   * @param gameID L'id del gioco
   * @param genre Il genere del gioco
   * @param name Il nome del gioco
   * @param img Lo sfondo del gioco
   */
  public addGame(gameID: number,genre: string,name: string,img: string): Observable<any>{
    const desiredURL: string = this.url + "/addGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    params = params.append("genere",genre);
    params = params.append("titolo",name);
    params = params.append("immagine",img);
    return this.httpClient.post(desiredURL,{},{params: params});
  }
  /***
   * Controlla se esiste un gioco dentro il database
   * @param gameID L'id del gioco
   */
  public existsGame(gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/containsGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.get(desiredURL,{params: params});
  }
  /***
   * Ottiene informazioni relative ad un gioco
   * @param gameID L'id del gioco
   */
  public getGame(gameID: number): Observable<any> {
    const desiredURL: string = this.url + "/getGame";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.get(desiredURL,{params: params});
  }

  /***
   * Ottiene la recensione di un gioco su un utente
   * @param username L'username dell'utente
   * @param gameID L'id del gioco
   */
  public getUserReview(username: string,gameID: number): Observable<Review>{
    const desiredURL: string = this.url + "/getUserReview";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.get<Review>(desiredURL,{params: params});
  }

  /***
   * Ottiene tutte le recensioni dell'utente
   * @param username L'username dell'utente
   */
  public getUserReviews(username: string): Observable<Review[]>{
    const desiredURL: string = this.url + "/getUserReviews";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    return this.httpClient.get<Review[]>(desiredURL,{params: params});
  }

  /***
   * Aggiunge un gioco alla lista dei desideri di un utente
   * @param username L'username dell'utente
   * @param gameID L'id del gioco
   */
  public addGameWishlist(username: string,gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/addGameWishlist";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.post(desiredURL,{},{params: params});
  }

  /***
   * Rimuove un gioco dalla wishlist di un utente
   * @param username L'username dell'utente
   * @param gameID L'id del gioco
   */
  public removeGameWishlist(username: string,gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/removeGameWishlist";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.post(desiredURL,{},{params: params});
  }

  /***
   * Controlla se la lista dei desideri di un utente contiene già un gioco
   * @param username L'username dell'utente
   * @param gameID L'id del gioco
   */
  public containsGameWishlist(username: string,gameID: number): Observable<any>{
    const desiredURL: string = this.url + "/containsGameWishlist";
    let params: HttpParams = new HttpParams();
    params = params.append("username",username);
    params = params.append("gameID",gameID);
    return this.httpClient.get(desiredURL,{
      params: params
    });
  }

  /***
   * Ottiene tutte le recensioni scritte da un utente
   * @param gameID L'id del gioco
   */
  public getReviews(gameID: number): Observable<Review[]>{
    const desiredURL: string =  this.url + "/getReviews";
    let params: HttpParams = new HttpParams();
    params = params.append("gameID",gameID);
    return this.httpClient.get<Review[]>(desiredURL,{
      params: params
    })
  }

  /***
   * Effettua il logout dalla parte di Angular
   */
  public performLogout(): void{
    if(this.currentSessionID.value)
    {
      const desiredURL: string = this.url + "/performLogout";
      let params: HttpParams = new HttpParams();
      params = params.append("sessionId",this.currentSessionID.value.toString());
      this.currentUsername.next(undefined);
      this.currentSessionID.next(undefined);
      this.httpClient.get(desiredURL,{params: params}).subscribe((value: any) => {});
    }
  }
  public getParams(): Params{
    return {jsessionid: this.currentSessionID.value};
  }
  public getSessionID(value: boolean): any {return value ? this.currentSessionID.value : this.currentSessionID};
  public getCurrentUsername(value: boolean): any {return value ? this.currentUsername.value : this.currentUsername};

}
