import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderingType,OrderingMode} from "../../../enum";
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Subscription, take} from "rxjs";

@Component({
  selector: 'app-sorting-selector',
  templateUrl: './sorting-selector.component.html',
  styleUrls: ['./sorting-selector.component.css']
})
export class SortingSelectorComponent implements OnInit,OnDestroy{

  public orderingTypeValues?: OrderingType[];
  public orderingModeValues?: OrderingMode[];
  public currentTypeSelected?: OrderingType;
  public currentModeSelected?: OrderingMode;
  public shouldBeVisible: boolean = true;
  private subscriptions: Subscription[] = [];
  constructor(private searchHandler: SearchHandlerService){
  }
  ngOnInit() {
    this.orderingTypeValues = Object.values(OrderingType);
    this.orderingModeValues = Object.values(OrderingMode);
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: boolean) => {
      this.currentTypeSelected = this.searchHandler.getCurrentOrderingType(true);
      this.currentModeSelected = this.searchHandler.getCurrentOrderingMode(true);
      this.shouldBeVisible = this.searchHandler.getCurrentName(true) == undefined;
    }));
  }
  ngOnDestroy(){
    this.subscriptions.forEach((value: any) => value.unsubscribe());
  }
  public updateType(value: OrderingType): void{
    this.searchHandler.setCurrentOrderingType(value);
  }
  public updateMode(value: OrderingMode): void{
    this.searchHandler.setCurrentOrderingMode(value);
  }
}
