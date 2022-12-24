import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../services/search-handler.service";
import {searchListener} from "../../interfaces";
import {interval} from "rxjs";
import {end} from "@popperjs/core";

export interface YearInterval{
  start: number,
  end: number,
}
@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit,searchListener{

  private startDate?: Date;
  private endDate?: Date;
  public currentInterval?: YearInterval;
  public intervals: YearInterval[] = [];

  constructor(private searchHandler: SearchHandlerService) {
    this.searchHandler.addListener(this);
  }
  ngOnInit(): void{
    let maxYear: number = new Date().getFullYear();
    let startYear: number = 1980;
    for(let i = startYear;i < maxYear;i+=10){
      let next: number = i + 10;
      let interval: YearInterval = {start: i,end: next};
      this.intervals.push(interval);
    }
  }
  searchCompleted(values: any[]): void {
  }
  searchFailed(): void {
  }
  searchStarted(): void {
    if(this.searchHandler.getStartDate() != undefined && this.searchHandler.getEndDate() != undefined){
      let startYear: number | undefined = this.searchHandler.getStartDate()?.getFullYear();
      let endYear: number | undefined= this.searchHandler.getEndDate()?.getFullYear()
      if(startYear != undefined && endYear != undefined){
        let interval: YearInterval = {start: startYear,end: endYear};
        this.currentInterval = interval;
        if(!this.intervals.includes(interval))
          this.intervals.push(interval)
      }
    }
  }
  public updateValue(value: YearInterval): void{
    let currentStart: string = value.start + "-" + "12" + "-" + "31";
    let currentEnd: string = value.end + "-" + "12" + "-" + "31";
    this.searchHandler.setStartDate(new Date(currentStart),false);
    this.searchHandler.setEndDate(new Date(currentEnd),true);
  }
  public getInterval(current: YearInterval) : string | undefined{
    if(current != undefined)
      return current.start + "-" + current.end;
    return undefined;
  }
}
