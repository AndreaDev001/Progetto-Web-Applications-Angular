import { Injectable } from '@angular/core';
import {faGamepad, faStore, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {
  faAndroid,
  faApple,
  faAppStoreIos, faItchIo,
  faLinux,
  faPlaystation, faSteam,
  faWindows,
  faXbox
} from "@fortawesome/free-brands-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class GameIconTranslatorService {
  constructor() {

  }
  public getPlatformIcon(value: string, defaultIcon: boolean): IconDefinition | undefined{
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
    else if(defaultIcon)
      return faGamepad;
    return undefined;
  }
  public getStoreIcon(value: string, defaultValue: boolean): IconDefinition | undefined{
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
    else if(defaultValue)
      return faStore;
    return undefined;
  }
}
