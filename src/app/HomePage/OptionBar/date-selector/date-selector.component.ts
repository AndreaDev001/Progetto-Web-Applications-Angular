import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Subscription} from "rxjs";

export interface YearInterval{
  start: number,
  end: number,
}
@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit,OnDestroy{

  public currentInterval?: YearInterval;
  public intervals: YearInterval[] = [];
  public shouldBeVisible: boolean = true;
  private subscriptions: Subscription[] = [];


  constructor(private searchHandler: SearchHandlerService) {

  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  /***
   * Si iscrive a tutti gli osservabili necessari
   */
  public ngOnInit(): void {
    let maxYear: number = new Date().getFullYear();
    let startYear: number = 1980;
    this.intervals.push({start: 1970,end: maxYear});
    for (let i = startYear; i < maxYear; i += 10) {
      let next: number = i + 10;
      let interval: YearInterval = {start: i, end: next};
      this.intervals.push(interval);
    }
    this.subscriptions.push(this.searchHandler.getCurrentName(false).subscribe((result: string | undefined) => this.shouldBeVisible = result == undefined));
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: boolean) => {
      let start: Date | undefined = this.searchHandler.getStartDate(true);
      let end: Date | undefined = this.searchHandler.getEndDate(true);
      if(start && end){
        this.currentInterval = {start: start.getFullYear(),end: end.getFullYear()};
      }
    }));
  }

  /***
   * Aggiorna l'intervallo di tempo attuale
   * @param value Il nuovo intervallo di tempo
   */
  public updateValue(value: YearInterval): void{
    let currentStart: string = value.start + "-" + "12" + "-" + "31";
    let currentEnd: string = value.end + "-" + "12" + "-" + "31";
    this.searchHandler.setCurrentDate(new Date(currentStart),new Date(currentEnd));
  }

  /***
   * Ritorna una stringa corrispondente ad un intervallo di tempo
   * @param current L'intervallo di tempo
   */
  public getInterval(current: YearInterval) : string | undefined{
    if(current != undefined)
      return current.start + "-" + current.end;
    return undefined;
  }
}
