import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";

export interface YearInterval{
  start: number,
  end: number,
}
@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit{

  public currentInterval?: YearInterval;
  public intervals: YearInterval[] = [];
  public shouldBeVisible: boolean = true;
  constructor(private searchHandler: SearchHandlerService) {

  }
  ngOnInit(): void {
    let maxYear: number = new Date().getFullYear();
    let startYear: number = 1980;
    for (let i = startYear; i < maxYear; i += 10) {
      let next: number = i + 10;
      let interval: YearInterval = {start: i, end: next};
      this.intervals.push(interval);
    }
    this.searchHandler.getCurrentName().subscribe((result: string | undefined) => this.shouldBeVisible = result == undefined);
    this.searchHandler.getLatestValues().subscribe((result : any[]) => {
      let start: number | undefined = this.searchHandler.getStartDateValue()?.getFullYear();
      let end: number | undefined = this.searchHandler.getEndDateValue()?.getFullYear();
      this.currentInterval = start && end ? {start: start,end: end} : this.currentInterval;
    });
  }
  public updateValue(value: YearInterval): void{
    let currentStart: string = value.start + "-" + "12" + "-" + "31";
    let currentEnd: string = value.end + "-" + "12" + "-" + "31";
    this.searchHandler.setCurrentDate(new Date(currentStart),new Date(currentEnd));
  }
  public getInterval(current: YearInterval) : string | undefined{
    if(current != undefined)
      return current.start + "-" + current.end;
    return undefined;
  }
}
