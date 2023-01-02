import {Component, Input, OnInit} from '@angular/core';
import {SideListType} from "../../../enum";
import {SideItem} from "../side-bar/side-bar.component";
import {SearchHandlerService} from "../../../services/search-handler.service";

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit{
  @Input() name?: string;
  @Input() listType?: SideListType;
  @Input() values?: SideItem[];
  private buttons?: NodeListOf<Element>
  constructor(private searchHandler: SearchHandlerService){

  }
  ngOnInit(): void{
    this.searchHandler.getLatestValues(false).subscribe((values: any[]) => {
      this.buttons = document.querySelectorAll("button.list-group-item.list-group-item.list-group-item-action");
      this.buttons.forEach((value: Element) => {
        let name: string | null = value.textContent;
        let currentGenre: string = this.searchHandler.getCurrentGenre(true);
        if(name && name.toLowerCase() != currentGenre)
           value.className = "list-group-item list-group-item-action side-item-button";
        else if(name)
          value.className = "list-group-item list-group-item-action side-item-selected";
      });
    })
  }
}
