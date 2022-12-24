import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../services/search-handler.service";
import {searchListener} from "../../interfaces";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit,searchListener{
  public startDate: string | null | undefined;
  public endDate: string | null | undefined;

  constructor(private searchHandler: SearchHandlerService) {
    this.searchHandler.addListener(this);
  }
  ngOnInit(): void{

  }
  searchCompleted(values: any[]): void {
  }
  searchFailed(): void {
  }
  searchStarted(): void {
    this.startDate = this.searchHandler.getStartDate();
    this.endDate = this.searchHandler.getEndDate();
    console.log("Here");
  }
  public updateStart(value: string | null | undefined){
    if(value != null)
       this.searchHandler.setStartDate(new Date(value),true);
  }
  public updateEnd(value: string | null | undefined){
    if(value != null)
        this.searchHandler.setEndDate(new Date(value),true);
  }
}
