import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // contatta il REST controller Registrationhandler con una post mappata su /doRegistration,
  // nel cui corpo inserisce email, username e password
  doRegistration(email: string, username: string, password: string): Observable<String> {
    console.warn("email: " + email + "\nusername: " + username + "\npassword: " + password)  // todo: debug
    return this.http.post(this.url + "/doRegistration",
      {email: email, username: username, password: password},
      {responseType: 'text'});
  }
}
