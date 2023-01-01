import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {OrderingMode, OrderingType} from "../../../enum";
import {faSearch, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit,OnDestroy{
  public currentName?: string;
  public searchIcon: IconDefinition = faSearch;
  private textField: HTMLInputElement | null = null;
  private subscriptions: Subscription[] = [];
  constructor(private searchHandler: SearchHandlerService) {
  }
  public ngOnInit(): void{
    this.textField = document.querySelector("input");
    this.subscriptions.push(this.searchHandler.getCurrentGenre(false).subscribe((value: string | undefined) => this.currentName = undefined));
    this.subscriptions.push(this.searchHandler.getCurrentOrderingType(false).subscribe((value: OrderingType | undefined) => this.currentName = undefined));
    this.subscriptions.push(this.searchHandler.getCurrentOrderingMode(false).subscribe((value: OrderingMode | undefined) => this.currentName = undefined));
    this.subscriptions.push(this.searchHandler.getCurrentName(false).subscribe((value: string | undefined) => this.currentName = value));
  }
  public ngOnDestroy() {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public handleInput(event: any): void{
    if(event.key == "Enter"){
      this.currentName = event.target.value;
      if(this.currentName)
           this.searchHandler.setCurrentName(this.currentName);
    }
  }
  public handleClick(): void{
    this.currentName = this.textField?.value;
    if(this.currentName){
      this.searchHandler.setCurrentName(this.currentName);
    }
  }
}
