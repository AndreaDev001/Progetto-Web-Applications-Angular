import {Component, OnInit} from '@angular/core';
import {faCircleExclamation, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-connection-error',
  templateUrl: './connection-error.component.html',
  styleUrls: ['./connection-error.component.css']
})
export class ConnectionErrorComponent implements OnInit{
  public errorIcon: IconDefinition = faCircleExclamation;

  constructor() {
  }
  public ngOnInit(): void{

  }
  public handleClick(): void{
    window.location.reload();
  }
}
