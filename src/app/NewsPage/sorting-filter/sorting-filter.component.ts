import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Sorting} from "../../enum";
import {faSort, faSortAmountUp, faSortAsc, faSortUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sorting-filter',
  templateUrl: './sorting-filter.component.html',
  styleUrls: ['./sorting-filter.component.css']
})

export class SortingFilterComponent {

  sortingTypes?: Sorting[] = []
  selectedSortingType = Sorting.LATEST
  public sortIcon: IconDefinition = faSortAmountUp;

  ngOnInit(): void {
    // init sorting dropdown
    this.sortingTypes = Object.values(Sorting);
  }

  @Output() sortingValueChanged = new EventEmitter<Sorting>();

  // Comunica al componente padre (news) il nuovo valore di this.selectedSortingType
  makeNewSearch() {
    this.sortingValueChanged.emit(this.selectedSortingType)
  }
  public updateSorting(value: Sorting): void{
    this.selectedSortingType = value;
    this.makeNewSearch();
  }
}
