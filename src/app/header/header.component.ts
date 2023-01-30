import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SpringHandlerService} from "../services/spring-handler.service";
import {Utente} from "../interfaces";
import {
  faPeopleGroup,
  faCircleUser,
  faHouse,
  faNewspaper,
  IconDefinition,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{

  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  private subscriptions: Subscription[] = [];
  public icons: IconDefinition[] = [faHouse,faNewspaper,faPeopleGroup,faCircleUser,faIdCard];
  constructor(public springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: Utente) => {
      this.isLogged = value != undefined;
      if(this.isLogged)
        this.isAdmin = value.amministratore;
    }));
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
