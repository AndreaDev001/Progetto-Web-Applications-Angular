import {Component, Input, OnInit} from '@angular/core';
import {GameListType, SideListType} from "../../../enum";
import {SearchHandlerService} from "../../../services/search-handler.service";

@Component({
  selector: 'app-side-item',
  templateUrl: './side-item.component.html',
  styleUrls: ['./side-item.component.css']
})
export class SideItemComponent implements OnInit{
  @Input() name: string = "";
  @Input() owner?: SideListType;
  @Input() img?: string;
  constructor(private searchHandler: SearchHandlerService) {
  }
  ngOnInit(): void{

  }
  public handeClick(): void{
    switch (this.owner){
      case SideListType.GENRES:
        console.log("Genre updated");
        this.searchHandler.setCurrentGenre(this.name);
        break;
      case SideListType.PLATFORMS:
        break;
      case SideListType.DEFAULT:
        const index = Object.values(GameListType).indexOf(this.name as unknown as GameListType);
        const value: GameListType = Object.values(GameListType)[index];
        this.searchHandler.setCurrentList(value);
        break;
    }
  }
}
