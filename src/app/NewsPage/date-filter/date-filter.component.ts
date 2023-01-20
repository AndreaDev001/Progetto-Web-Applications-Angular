import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateRange} from "../../enum";

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})

export class DateFilterComponent implements OnInit {
  dateRanges: DateRange[] = [];
  selectedDateRange: DateRange = DateRange.ALL;

  ngOnInit() {
    // init Dates dropdown
    this.dateRanges = Object.values(DateRange)
  }

  @Output() dateValueChanged = new EventEmitter<DateRange>();

  makeNewSearch() {
    console.warn("MAKE NEW SEARCH")
    this.dateValueChanged.emit(this.selectedDateRange)
  }
  public updateDate(value: DateRange): void {
    this.selectedDateRange = value;
    this.makeNewSearch();
  }
}
