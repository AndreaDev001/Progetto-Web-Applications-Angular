import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
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
    this.searchHandler.getCurrentGenre().subscribe((value: string | undefined) => {
      this.currentGenre = value;
      this.currentName = undefined;
    });
    this.searchHandler.getCurrentOrderingType().subscribe((value: OrderingType | undefined) => {
      this.currentType = value;
      this.currentName = undefined;
    });
    this.searchHandler.getCurrentOrderingMode().subscribe((value: OrderingMode | undefined) => {
      this.currentMode = value;
      this.currentName = undefined;
    });
    this.searchHandler.getCurrentName().subscribe((value: string | undefined) => this.currentName = value);
  }
  public handleInput(event: any): void{
    if(event.key == "Enter"){
      this.currentName = event.target.value;
      if(this.currentName)
           this.searchHandler.setCurrentName(this.currentName);
    }
  }
}
