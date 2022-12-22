import { Injectable } from '@angular/core';
import {GameListType, OrderingMode, OrderingType} from "../enum";
import {GameHandlerService} from "./game-handler.service";

@Injectable({
  providedIn: 'root'
})
export class SearchHandlerService {
  private currentOrderingType?: OrderingType;
  private currentOrderingMode?: OrderingMode;
  private currentListType?: GameListType;
  private currentGenre?: string;
  constructor(private gameHandler: GameHandlerService) {

  }
  public setCurrentOrderingType(orderingType: OrderingType,search: boolean): any{
    this.currentOrderingType = orderingType;
    this.currentListType = undefined;
    if(search)
       return this.performSearch();
  }
  public setCurrentOrderingMode(orderingMode: OrderingMode,search: boolean): any{
    this.currentOrderingMode = orderingMode;
    this.currentListType = undefined;
    if(search)
        return this.performSearch();
  }
  public setCurrentGenre(genre: string,search: boolean): any{
    this.currentGenre = genre;
    this.currentListType = undefined;
    if(search)
       return this.performSearch();
  }
  public setCurrentList(listType: GameListType,search: boolean): any{
    this.currentListType = listType;
    this.currentGenre = undefined;
    this.currentOrderingType = undefined;
    this.currentOrderingMode = undefined;
    if(search)
       return this.performSearch();
  }
  public performSearch(): any{
    if(this.currentListType == undefined)
      return this.gameHandler.search(this.currentOrderingType,this.currentOrderingMode,this.currentGenre);
    else
      return this.gameHandler.getGameList(this.currentListType);
  }
}
