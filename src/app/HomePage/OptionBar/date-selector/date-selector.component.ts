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

  private startDate?: Date;
  private endDate?: Date;
  public currentInterval?: YearInterval;
  public intervals: YearInterval[] = [];
  public shouldBeVisible: boolean = true;
  private currentName: string | undefined;

  constructor(private searchHandler: SearchHandlerService) {

  }
  ngOnInit(): void{
    let maxYear: number = new Date().getFullYear();
    let startYear: number = 1980;
    for(let i = startYear;i < maxYear;i+=10){
      let next: number = i + 10;
      let interval: YearInterval = {start: i,end: next};
      this.intervals.push(interval);
    }
    this.searchHandler.getCurrentName().subscribe((result: string | undefined) => this.currentName = result);
    this.searchHandler.getStartDate().subscribe((result: Date | undefined) => this.startDate = result);
    this.searchHandler.getEndDate().subscribe((result: Date | undefined) => this.endDate = result);
    this.searchHandler.getLatestValues().subscribe((result: any[]) => this.updateValues());
  }
  private updateValues(): void {
    this.shouldBeVisible = !this.currentName;
    if(this.searchHandler.getStartDate() != undefined && this.searchHandler.getEndDate() != undefined){
      let startYear: number | undefined = this.startDate?.getFullYear();
      let endYear: number | undefined= this.endDate?.getFullYear();
      if(startYear != undefined && endYear != undefined)
        this.currentInterval = {start: startYear,end: endYear};
    }
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
