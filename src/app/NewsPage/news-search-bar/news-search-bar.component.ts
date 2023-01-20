import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faSearch, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-news-search-bar',
  templateUrl: './news-search-bar.component.html',
  styleUrls: ['./news-search-bar.component.css']
})
export class NewsSearchBarComponent {
  searchForm!: FormGroup;
  public searchIcon: IconDefinition = faSearch;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchField: new FormControl('', Validators.required)
    });
  }

  @Output() searchValueChanged = new EventEmitter<string>();

  makeNewSearch() {
    let searchValue = this.searchForm.get('searchField')?.value
    this.searchValueChanged.emit(searchValue)
  }
}
