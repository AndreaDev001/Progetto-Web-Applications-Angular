import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {MessagePopUpComponent} from "./message-pop-up/message-pop-up.component";
import {AlertHandlerService} from "./services/alert-handler.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  public title: string = 'News';
  private sessionId: string = "";
  private isLogged: Boolean = false;
  @ViewChild("popup") popupComponent?: MessagePopUpComponent;
  constructor(private authenticationService: AuthenticationService,private alertHandler: AlertHandlerService) {

  }
  public ngOnInit(): void {
    console.log("sessionId: " + this.sessionId);  // todo: debug
    const urlParams = new URLSearchParams(window.location.search); // prendo tutti i parametri contenuti NELL'URL
    for (let param of urlParams) {
      console.log("urlparams:\n" + param);
    }
    let sessionId: string | null = urlParams.get('jsessionid');
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
  public ngAfterViewInit(): void {
    this.alertHandler.setCurrentAlert(this.popupComponent);
  }
}
