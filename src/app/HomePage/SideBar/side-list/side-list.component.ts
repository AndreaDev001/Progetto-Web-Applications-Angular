import {AfterViewChecked, Component, Input, OnDestroy} from '@angular/core';
import {SideListType} from "../../../enum";
import {SideItem} from "../side-bar/side-bar.component";
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements AfterViewChecked,OnDestroy{
  @Input() name?: string;
  @Input() listType?: SideListType;
  @Input() values?: SideItem[];
  private buttons?: NodeListOf<Element>
  private subscriptions: Subscription[] = [];
  constructor(private searchHandler: SearchHandlerService){

  }
  public ngAfterViewChecked(): void {
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: boolean) => this.updateCurrentSelection()));
  }
  private updateCurrentSelection(): void{
    let currentGenre: string = this.searchHandler.getCurrentGenre(true);
    let currentList: string = this.searchHandler.getCurrentList(true);
    let currentName: string = this.searchHandler.getCurrentName(true);
    this.buttons = document.querySelectorAll("button.list-group-item.list-group-item.list-group-item-action");
    this.buttons.forEach((value: Element) => {
      let name: string | null = value.textContent;
      if(currentName != undefined)
        value.className =  "list-group-item list-group-item-action side-item-button";
      if(currentList != undefined)
        value.className = name && name.toLowerCase() == currentList ? "list-group-item list-group-item-action side-item-selected" : "list-group-item list-group-item-action side-item-button";
      if(currentGenre != undefined)
        value.className = name && name.toLowerCase() == currentGenre ? "list-group-item list-group-item-action side-item-selected" : "list-group-item list-group-item-action side-item-button";
    });
  }
  public ngOnDestroy() {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
