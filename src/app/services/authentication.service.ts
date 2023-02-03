import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private url : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // Invoca la servlet mappata con /checkAuth passandole la jsessionid
  // restituisce true se l'utente è loggato, false altrimenti.
  // Utilizzato in tutte quelle pagine angular che possono essere visualizzate solo da un utente autenticato
  checkLogin(jsessionid: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.url + "/checkAuth", {params: {jsessionid: jsessionid}});
  }

  doRegistration(email: string, username: string, password: string): Observable<String> {
    return this.http.post(this.url + "/doRegistration",
      {email: email, username: username, password: password},
      {responseType: 'text'});
  }
}
