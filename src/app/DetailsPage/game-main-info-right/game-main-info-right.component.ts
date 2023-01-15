import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../../interfaces";
import {overflowItem} from "../text-overflow/text-overflow.component";
import {faGamepad, faList, faStore, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {
  faAndroid,
  faApple,
  faAppStoreIos, faItchIo,
  faLinux,
  faPlaystation, faSteam,
  faWindows,
  faXbox
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-game-main-info-right',
  templateUrl: './game-main-info-right.component.html',
  styleUrls: ['./game-main-info-right.component.css']
})
export class GameMainInfoRightComponent implements OnInit{
  @Input() gameInfo?: GameInfo;
  public defaultIcons: IconDefinition[] = [faStore,faGamepad,faList];
  constructor() {
  }
  public ngOnInit(): void{

  }
  public createGenres(): overflowItem[]{
    let genres: overflowItem[] = [];
    if(this.gameInfo?.genres){
      for(let current of this.gameInfo.genres)
        genres.push({name: current});
    }
    return genres;
  }
  public createPlatforms(): overflowItem[]{
    let platforms: overflowItem[] = [];
    if(this.gameInfo?.platforms){
      for(let current of this.gameInfo.platforms)
        platforms.push({name: current,icon: this.getPlatformIcon(current)})
    }
    return platforms;
  }
  public createStores(): overflowItem[]{
    let stores: overflowItem[] = [];
    if(this.gameInfo?.stores)
    {
      for(let current of this.gameInfo.stores)
        stores.push({name: current.name,icon: this.getStoreIcon(current.name),link: current.link});
    }
    return stores;
  }
  public getPlatformIcon(value: string): IconDefinition | undefined{
    value = value.toLowerCase();
    if(value.includes("playstation"))
      return faPlaystation;
    else if(value.includes("xbox"))
      return faXbox;
    else if(value.includes("android"))
      return faAndroid;
    else if(value.includes("ios"))
      return faApple;
    else if(value.includes("pc"))
      return faWindows;
    else if(value.includes("linux"))
      return faLinux;
    else if(value.includes("mac"))
      return faApple;
    else
      return faGamepad;
  }
  public getStoreIcon(value: string): IconDefinition{
    value = value.toLowerCase();
    if(value.includes("playstation"))
      return faPlaystation;
    else if(value.includes("xbox"))
      return faXbox;
    else if(value.includes("app store"))
      return faAppStoreIos;
    else if(value.includes("steam"))
      return faSteam;
    else if(value.includes("itch.io"))
      return faItchIo;
    else
      return faStore;
  }
}
