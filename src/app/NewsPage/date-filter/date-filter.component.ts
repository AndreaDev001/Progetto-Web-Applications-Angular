import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateRange} from "../../enum";
import {faCalendarDays, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})

export class DateFilterComponent implements OnInit {
  dateRanges: DateRange[] = [];
  selectedDateRange: DateRange = DateRange.ALL;
  public dateIcon: IconDefinition = faCalendarDays;

  ngOnInit() {
    // init Dates dropdown
    this.dateRanges = Object.values(DateRange)
  }

  @Output() dateValueChanged = new EventEmitter<DateRange>();

  // Comunica al componente padre (news) il nuovo valore di selectedDateRange
  makeNewSearch() {
    this.dateValueChanged.emit(this.selectedDateRange)
  }

  public updateDate(value: DateRange): void {
    this.selectedDateRange = value;
    this.makeNewSearch();
  }
}
