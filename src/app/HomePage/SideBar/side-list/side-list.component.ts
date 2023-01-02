import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SideListType} from "../../../enum";
import {SideItem} from "../side-bar/side-bar.component";
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit,OnDestroy{
  @Input() name?: string;
  @Input() listType?: SideListType;
  @Input() values?: SideItem[];
  private buttons?: NodeListOf<Element>
  private subscriptions: Subscription[] = [];
  constructor(private searchHandler: SearchHandlerService){

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: boolean) => {
      this.buttons = document.querySelectorAll("button.list-group-item.list-group-item.list-group-item-action");
      this.buttons.forEach((value: Element) => {
        let name: string | null = value.textContent;
        let currentGenre: string = this.searchHandler.getCurrentGenre(true);
        if(name && name.toLowerCase() != currentGenre)
           value.className = "list-group-item list-group-item-action side-item-button";
        else if(name)
          value.className = "list-group-item list-group-item-action side-item-selected";
      });
    }));
  }
  public ngOnDestroy() {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
