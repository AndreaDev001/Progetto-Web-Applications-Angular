import {Component, Input, OnInit} from '@angular/core';
import {faCircleExclamation, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{

  public errorIcon: IconDefinition = faCircleExclamation;
  @Input() errorMessage?: string;
  @Input() errorButtonText?: string;
  constructor()
  {

  }
  public ngOnInit(): void{

  }
  public handleClick(): void{
    window.location.reload();
  }
}
