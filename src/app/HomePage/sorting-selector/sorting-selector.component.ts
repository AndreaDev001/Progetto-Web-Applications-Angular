import {Component, OnInit} from '@angular/core';
import {OrderingMode, OrderingType} from "../../enum";
import {SearchHandlerService} from "../../services/search-handler.service";

@Component({
  selector: 'app-sorting-selector',
  templateUrl: './sorting-selector.component.html',
  styleUrls: ['./sorting-selector.component.css']
})
export class SortingSelectorComponent implements OnInit{

  public orderingTypeValues?: OrderingType[];
  public orderingModeValues?: OrderingMode[];
  public currentTypeSelected?: OrderingType;
  public currentModeSelected?: OrderingMode;
  constructor(private searchHandler: SearchHandlerService){
    this.currentTypeSelected = this.searchHandler.getCurrentOrderingType();
    this.currentModeSelected = this.searchHandler.getCurrentOrderingMode();
  }
  ngOnInit() {
    this.orderingTypeValues = Object.values(OrderingType);
    this.orderingModeValues = Object.values(OrderingMode);
  }
  public updateType(value: OrderingType): void{
    this.searchHandler.setCurrentOrderingType(value,true);
    this.currentTypeSelected = value;
  }
  public updateMode(value: OrderingMode): void{
    this.searchHandler.setCurrentOrderingMode(value,true);
    this.currentModeSelected = value;
  }
}
