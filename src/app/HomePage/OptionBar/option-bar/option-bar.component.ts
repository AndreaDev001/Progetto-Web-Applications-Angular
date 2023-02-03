import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchHandlerService} from "../../../services/search-handler.service";

@Component({
  selector: 'app-option-bar',
  templateUrl: './option-bar.component.html',
  styleUrls: ['./option-bar.component.css']
})
export class OptionBarComponent implements OnInit,OnDestroy{
  private subscriptions: Subscription[] = [];
  constructor(private searchHandler: SearchHandlerService) {

  }

  /***
   * Si iscrive a tutti gli osservabili necessari
   */
  public ngOnInit(): void{
      this.subscriptions.push(this.searchHandler.getCurrentList(false).subscribe((value: any) => {
        let optionHolder: HTMLElement | null = document.getElementById("optionHolder");
        if(optionHolder != null){
           optionHolder.style.display = value != undefined ? "none" : "flex";
        }
      }));
  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
