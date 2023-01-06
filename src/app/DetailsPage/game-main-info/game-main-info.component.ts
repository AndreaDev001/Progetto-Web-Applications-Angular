import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../game-detail/game-detail.component";
import {
  faGlobe,
  faStar,
  faHeartCirclePlus,
  IconDefinition,
  faStore,
  faGamepad, faList, faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import {
  faAndroid,
  faApple, faAppStoreIos, faItchIo,
  faLinux,
  faPlaystation,
  faReddit, faSteam,
  faWindows,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";
import {overflowItem} from "../text-overflow/text-overflow.component";

@Component({
  selector: 'app-game-main-info',
  templateUrl: './game-main-info.component.html',
  styleUrls: ['./game-main-info.component.css']
})
export class GameMainInfoComponent implements OnInit{
  @Input() gameInfo?: GameInfo;
  public icons: IconDefinition[] = [faReddit,faGlobe,faStar,faCalendarDays,faHeartCirclePlus];
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
    if(this.gameInfo?.stores){
      for(let current of this.gameInfo.stores)
        stores.push({name: current,icon: this.getStoreIcon(current)});
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
