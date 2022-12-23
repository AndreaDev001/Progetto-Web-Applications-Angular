import {Injectable} from '@angular/core';
import {GameListType, OrderingMode, OrderingType, SearchEventType} from "../enum";
import {GameHandlerService} from "./game-handler.service";
import {searchListener, searchSubject} from "../interfaces";
import {GameRouterHandlerService, ParamType} from "./game-router-handler.service";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchHandlerService implements searchSubject{
  private currentOrderingType?: OrderingType = OrderingType.METACRITIC;
  private currentOrderingMode?: OrderingMode = OrderingMode.DESCENDED;
  private currentListType?: GameListType;
  private currentName?: string;
  private currentGenre?: string;
  private latestValues: any[] = [];

  private searchListeners: searchListener[] = [];
  constructor(private gameHandler: GameHandlerService,private gameRouterHandler: GameRouterHandlerService){
    let observable = this.gameRouterHandler.getCurrentParamType();
    observable.pipe(first()).subscribe((result: ParamType) => {
      this.currentOrderingType = result.orderingType;
      this.currentOrderingMode = result.orderingMode;
      this.currentGenre = result.genre;
      console.log(this.currentOrderingType);
      if(this.currentOrderingType == undefined)
          this.currentOrderingType = OrderingType.METACRITIC;
      if(this.currentOrderingMode == undefined)
          this.currentOrderingMode = OrderingMode.DESCENDED;
    });
  }
  public setCurrentOrderingType(orderingType: OrderingType,search: boolean): any{
    this.currentOrderingType = orderingType;
    this.currentListType = undefined;
    if(search){
      this.performSearch();
    }
  }
  public setCurrentOrderingMode(orderingMode: OrderingMode,search: boolean): any{
    this.currentOrderingMode = orderingMode;
    this.currentListType = undefined;
    if(search){
      this.performSearch();
    }
  }
  public setCurrentGenre(genre: string,search: boolean): any{
    this.currentGenre = genre.toLowerCase();
    this.currentListType = undefined;
    if(search){
      this.performSearch();
    }
  }
  public setCurrentList(listType: GameListType,search: boolean): any{
    this.currentListType = listType;
    this.currentGenre = undefined;
    this.currentOrderingType = undefined;
    this.currentOrderingMode = undefined;
    if(search)
      this.performSearch();
  }
  public performSearch(): any{
    this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType,orderingMode: this.currentOrderingMode,genre: this.currentGenre})
    this.notifyAll(SearchEventType.STARTED);
    if(this.currentListType == undefined)
      this.gameHandler.search(this.currentOrderingType,this.currentOrderingMode,this.currentGenre).subscribe((result: any) => {
        this.latestValues = result.results;
        this.notifyAll(this.latestValues?.length == 0 ? SearchEventType.FAILED : SearchEventType.COMPLETED);
      })
    else
      this.gameHandler.getGameList(this.currentListType).subscribe((result: any) => {
        this.latestValues = result.results;
        this.notifyAll(this.latestValues?.length == 0 ? SearchEventType.FAILED : SearchEventType.COMPLETED);
      })
  }
  public setCurrentName(name: string,search: boolean): any{
    this.currentName = name;
    this.currentListType = undefined;
    if(search)
        this.performSearch();
  }

  addListener(listener: searchListener): void {
    if(!this.searchListeners.includes(listener))
        this.searchListeners.push(listener);
  }
  notifyAll(eventType: SearchEventType): void {
    for(let current of this.searchListeners){
      switch (eventType){
        case SearchEventType.STARTED:
          current.searchStarted();
          break;
        case SearchEventType.FAILED:
          current.searchFailed();
          break;
        case SearchEventType.COMPLETED:
          current.searchCompleted(this.latestValues);
          break;
      }
    }
  }
  removeListener(listener: searchListener): void {
    if(this.searchListeners.includes(listener)){
      const index = this.searchListeners.indexOf(listener);
      this.searchListeners.splice(index,1);
    }
  }
  public getCurrentGenre(): string | undefined {return this.currentGenre;}
  public getCurrentOrderingType(): OrderingType | undefined {return this.currentOrderingType;}
  public getCurrentOrderingMode(): OrderingMode | undefined {return this.currentOrderingMode;}
}
