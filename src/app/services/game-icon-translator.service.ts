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

  /***
   * Ritorna una icona di una piattaforma desiderata
   * @param value Nome dell'icona
   * @param defaultIcon Se non viene trovata nessuna icona, se utilizzare una icona predefinita
   */
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

  /***
   * Ritorna una icona di un negozio
   * @param value Il nome dell'icona
   * @param defaultValue Se non viene trovata nessuna icona, se utilizzare una icona predefinita
   */
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

  /***
   * Ritorna una immagine relativa a esrb
   * @param value Il nome dell'immagine esrb
   */
  public getEsrbImage(value: string | undefined): string | undefined
  {
    switch(value) {
      case "teen":
        return "https://www.esrb.org/wp-content/uploads/2019/05/T.svg";
      case "mature":
        return "https://www.esrb.org/wp-content/uploads/2019/05/M.svg";
      case "everyone":
        return "https://www.esrb.org/wp-content/uploads/2019/05/E.svg";
      case "everyone-10-plus":
        return "https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg";
      default:
        return undefined;
    }
  }
}
