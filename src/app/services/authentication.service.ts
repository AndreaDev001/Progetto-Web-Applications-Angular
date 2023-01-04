import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private url : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }


  // da inserire in tutte quelle pagine angular che possono essere visualizzate solo da chi è loggato
  checkLogin(jsessionid: string): Observable<Boolean> {
    // chiamo la servlet mappata con /checkAuth e le passo la jsessionid
    // restituisce true se l'utente è loggato, false altrimenti
    return this.http.get<Boolean>(this.url + "/checkAuth", {params: {jsessionid: jsessionid}});
  }

  // contatta il REST controller Registrationhandler con una post mappata su /doRegistration,
  // nel cui corpo inserisce email, username e password
  doRegistration(email: string, username: string, password: string): Observable<String> {
    console.warn("email: " + email + "\nusername: " + username + "\npassword: " + password)  // todo: debug
    return this.http.post(this.url + "/doRegistration",
      {email: email, username: username, password: password},
      {responseType: 'text'});
  }
}
