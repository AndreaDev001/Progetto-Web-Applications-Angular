import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {searchListener} from "../../../interfaces";
import {OrderingMode, OrderingType} from "../../../enum";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  public currentName?: string;
  private currentGenre: string | undefined;
  private currentType: OrderingType | undefined;
  private currentMode: OrderingMode | undefined;
  constructor(private searchHandler: SearchHandlerService) {

  }
  public ngOnInit(): void{
    this.searchHandler.getCurrentGenre().subscribe((value: string | undefined) => this.currentGenre = value);
    this.searchHandler.getCurrentOrderingType().subscribe((value: OrderingType | undefined) => this.currentType = value);
    this.searchHandler.getCurrentOrderingMode().subscribe((value: OrderingMode | undefined) => this.currentMode = value);
    this.searchHandler.getLatestValues().subscribe((values: any[]) => {
      if(this.currentGenre || this.currentType || this.currentMode)
         this.currentName = "";
    })
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
