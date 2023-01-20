import { Component } from '@angular/core';
import {faSearch, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.css']
})

export class NoResultsComponent {
  public icon: IconDefinition = faSearch;
}
