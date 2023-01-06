import {Component, Input, OnInit} from '@angular/core';
import {GameListType, SideListType} from "../../../enum";
import {Genre, Platform} from "../../../interfaces";
import {GameHandlerService} from "../../../services/game-handler.service";
import {GameJSONReaderService} from "../../../services/game-jsonreader.service";

export interface SideItem{
  name: string,
  img?: string,
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  public listTypes: SideListType[] = [SideListType.GENRES,SideListType.PLATFORMS,SideListType.DEFAULT];
  public genres: SideItem[] = [];
  public platforms: SideItem[] = [];
  public lists: SideItem[] = [];
  @Input() isScrollable?: boolean;
  constructor(private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService) {
  }
  ngOnInit(): void{
    for(let current of Object.values(GameListType)){
      let value: SideItem = {name: current};
      this.lists.push(value);
    }
    this.gameHandler.getGenres(false).subscribe((result: any[]) =>{
      let genres: Genre[] = this.gameJSONReader.readGenres(result);
      for(let current of genres){
        let name: string = current.slug;
        let img: string = current.img;
        let sideItem: SideItem = {name: name,img: img};
        this.genres.push(sideItem);
      }
    });
    this.gameHandler.getPlatforms(false).subscribe((result: any[]) => {
      let platforms: Platform[] = this.gameJSONReader.readPlatforms(result);
      for(let current of platforms){
        let name: string = current.name;
        let sideItem: SideItem = {name: name};
        this.platforms.push(sideItem);
      }
    });
  }
}
