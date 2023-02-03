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

  /***
   * Si iscrive a tutti gli osservabili richiesti
   */
  public ngOnInit() {
    this.orderingTypeValues = Object.values(OrderingType);
    this.orderingModeValues = Object.values(OrderingMode);
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: boolean) => {
      this.currentTypeSelected = this.searchHandler.getCurrentOrderingType(true);
      this.currentModeSelected = this.searchHandler.getCurrentOrderingMode(true);
      this.shouldBeVisible = this.searchHandler.getCurrentName(true) == undefined;
    }));
  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy(){
    this.subscriptions.forEach((value: any) => value.unsubscribe());
  }

  /**
   * Richiede allo searchHandler di aggiornare il tipo di ordinamento
   * @param value Il nuovo tipo di ordinamento richiesto
   */
  public updateType(value: OrderingType): void{
    this.searchHandler.setCurrentOrderingType(value);
  }

  /***
   * Richiede allo searchHandler di aggiornare la modalità di ordinamento
   * @param value La nuova modalità di ordinamento
   */
  public updateMode(value: OrderingMode): void{
    this.searchHandler.setCurrentOrderingMode(value);
  }
}
