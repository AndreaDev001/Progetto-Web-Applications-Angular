import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private url : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  doRegistration(email: string, username: string, password: string): Observable<String> {
    return this.http.post(this.url + "/doRegistration",
      {email: email, username: username, password: password},
      {responseType: 'text'});
  }
}
