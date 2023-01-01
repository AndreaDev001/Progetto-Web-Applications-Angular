import {Component, OnInit} from '@angular/core';
import {OrderingType,OrderingMode} from "../../../enum";
import {SearchHandlerService} from "../../../services/search-handler.service";

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
  public shouldBeVisible: boolean = true;
  constructor(private searchHandler: SearchHandlerService){
  }
  ngOnInit() {
    this.orderingTypeValues = Object.values(OrderingType);
    this.orderingModeValues = Object.values(OrderingMode);
    this.searchHandler.getCurrentName().subscribe((result: string | undefined) => this.shouldBeVisible = result == undefined);
    this.searchHandler.getCurrentOrderingType().subscribe((value: OrderingType | undefined) => this.currentTypeSelected = value);
    this.searchHandler.getCurrentOrderingMode().subscribe((value: OrderingMode | undefined) => this.currentModeSelected = value);
  }
  public updateType(value: OrderingType): void{
    this.searchHandler.setCurrentOrderingType(value);
  }
  public updateMode(value: OrderingMode): void{
    this.searchHandler.setCurrentOrderingMode(value);
  }
}
