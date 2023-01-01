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
    this.subscriptions.push(this.searchHandler.getCurrentName(false).subscribe((result: string | undefined) => this.shouldBeVisible = result == undefined));
    this.subscriptions.push(this.searchHandler.getCurrentOrderingType(false).subscribe((value: OrderingType | undefined) => this.currentTypeSelected = value));
    this.subscriptions.push(this.searchHandler.getCurrentOrderingMode(false).subscribe((value: OrderingMode | undefined) => this.currentModeSelected = value));
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
