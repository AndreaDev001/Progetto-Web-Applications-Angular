import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SpringHandlerService} from "../services/spring-handler.service";
import {Utente} from "../interfaces";
import {faCircleInfo, faCircleUser, faHouse, faNewspaper, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{

  @Input() isLogged: boolean = false;
  private subscriptions: Subscription[] = [];
  public icons: IconDefinition[] = [faHouse,faNewspaper,faCircleInfo,faCircleUser];
  constructor(private springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: Utente) => this.isLogged = value != undefined));
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
