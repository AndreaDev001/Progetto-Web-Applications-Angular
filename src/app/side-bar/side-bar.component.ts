import {Component, OnInit} from '@angular/core';
import {SideListType} from "../enum";
import {Genre, Platform} from "../interfaces";
import {GameHandlerService} from "../services/game-handler.service";
import {GameJSONReaderService} from "../services/game-jsonreader.service";

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
  public listTypes: SideListType[] = [SideListType.GENRES,SideListType.PLATFORMS];
  public genres: SideItem[] = [];
  public platforms: SideItem[] = [];
  constructor(private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService) {
  }
  ngOnInit(): void{
    this.gameHandler.getGenres().subscribe((result: any) => {
      let genres: Genre[] = this.gameJSONReader.readGenres(result.results);
      for(let current of genres){
        let name: string = current.name;
        let img: string = current.img;
        let sideItem: SideItem = {name: name,img: img};
        this.genres.push(sideItem);
      }
    });
    this.gameHandler.getPlatforms().subscribe((result: any) => {
      let platforms: Platform[] = this.gameJSONReader.readPlatforms(result.results);
      for(let current of platforms){
        let name: string = current.name;
        let sideItem: SideItem = {name: name};
        this.platforms.push(sideItem);
      }
    });
  }
}
