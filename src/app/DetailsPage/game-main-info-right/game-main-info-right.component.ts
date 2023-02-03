import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../../interfaces";
import {overflowItem} from "../text-overflow/text-overflow.component";
import {faGamepad, faList, faStore, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {GameIconTranslatorService} from "../../services/game-icon-translator.service";

@Component({
  selector: 'app-game-main-info-right',
  templateUrl: './game-main-info-right.component.html',
  styleUrls: ['./game-main-info-right.component.css']
})
export class GameMainInfoRightComponent implements OnInit{
  @Input() gameInfo?: GameInfo;
  public defaultIcons: IconDefinition[] = [faStore,faGamepad,faList];
  constructor(private gameIconTranslator: GameIconTranslatorService){
  }
  public ngOnInit(): void{

  }

  /***
   * Crea tutti gli overflowItems riguardanti i generi
   */
  public createGenres(): overflowItem[]
  {
    let genres: overflowItem[] = [];
    if(this.gameInfo?.genres)
      for(let current of this.gameInfo.genres)
        genres.push({name: current});
    return genres;
  }

  /***
   * Crea tutti gli overflowItems per le piattaforme
   */
  public createPlatforms(): overflowItem[]{
    let platforms: overflowItem[] = [];
    if(this.gameInfo?.platforms)
      for(let current of this.gameInfo.platforms)
        platforms.push({name: current,icon: this.gameIconTranslator.getPlatformIcon(current,true)})
    return platforms;
  }

  /***
   * Crea tutti gli overflow items per i negozi
   */
  public createStores(): overflowItem[]{
    let stores: overflowItem[] = [];
    if(this.gameInfo?.stores)
      for(let current of this.gameInfo.stores)
        stores.push({name: current.name,icon: this.gameIconTranslator.getStoreIcon(current.name,true),link: current.link});
    return stores;
  }
}
