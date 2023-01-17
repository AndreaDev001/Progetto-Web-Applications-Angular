import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchField: new FormControl('', Validators.required)
    });
  }

  @Output() searchValueChanged = new EventEmitter<string>();

  makeNewSearch() {
    var searchValue = this.searchForm.get('searchField')?.value
    this.searchValueChanged.emit(searchValue)
  }
}
