import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {}

  sessionId: string = "";
  isLogged: Boolean = false;

  ngOnInit(): void {

    console.log("sessionId: " + this.sessionId);  // todo: debug
    const urlParams = new URLSearchParams(window.location.search); // prendo tutti i parametri contenuti NELL'URL

    for (var param of urlParams) {
      console.log("urlparams:\n" + param);
    }

    var sessionId = urlParams.get('jsessionid');
    if (sessionId) {
      console.warn("id NON nullo: " + this.sessionId);  // todo: debug

      // l'esito del service va nella var loginStatus
      this.authenticationService.checkLogin(sessionId).subscribe(loginStatus => {
        this.isLogged = loginStatus; // assume il valore restituito dal service di autenticazione (checkLogin): true se si è effettuato correttamente il login, false altrimenti
        if (loginStatus) {
          if (sessionId != null) {
            this.sessionId = sessionId;
          }
        }
      })
    }
    else {
      console.warn("id nullo") // todo: debug
    }
  }
}
