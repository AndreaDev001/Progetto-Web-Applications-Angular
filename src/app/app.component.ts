import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {MessagePopUpComponent} from "./message-pop-up/message-pop-up.component";
import {AlertHandlerService} from "./services/alert-handler.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  public title: string = 'News';
  private sessionId: string = "";
  private isLogged: Boolean = false;
  @ViewChild("popup") popupComponent?: MessagePopUpComponent;
  constructor(private authenticationService: AuthenticationService,private alertHandler: AlertHandlerService) {

  }

  public ngAfterViewInit(): void {
    this.alertHandler.setCurrentAlert(this.popupComponent);
  }
}
