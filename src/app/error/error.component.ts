import {Component, Input, OnInit} from '@angular/core';
import {faCircleExclamation, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit
{
  @Input() errorMessage?: string;
  @Input() errorButtonText?: string;
  public errorIcon: IconDefinition = faCircleExclamation;

  constructor() {

  }
  public ngOnInit(): void{

  }

  /***
   * Ricarica la pagina
   */
  public handleClick(): void{
    window.location.reload();
  }
}
