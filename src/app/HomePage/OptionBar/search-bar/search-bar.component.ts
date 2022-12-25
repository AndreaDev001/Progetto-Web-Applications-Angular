import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {searchListener} from "../../../interfaces";
import {OrderingMode, OrderingType} from "../../../enum";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit,searchListener{
  public currentName?: string;
  constructor(private searchHandler: SearchHandlerService) {
    this.searchHandler.addListener(this);
  }
  public ngOnInit(): void{

  }
  searchCompleted(values: any[]): void {
  }
  searchFailed(): void {
  }
  searchStarted(): void {
    this.currentName = this.searchHandler.getCurrentName();
    let currentGenre: string | undefined = this.searchHandler.getCurrentGenre();
    let currentType: OrderingType | undefined = this.searchHandler.getCurrentOrderingType();
    let currentMode: OrderingMode | undefined = this.searchHandler.getCurrentOrderingMode();
    if(currentGenre || currentType || currentMode){
      this.currentName = "";
    }
  }
  public handleInput(event: any): void{
    if(event.key == "Enter"){
      let value: string = event.target.value;
      console.log(value);
      this.currentName = value;
      this.searchHandler.setCurrentName(this.currentName,true);
    }
  }
}
