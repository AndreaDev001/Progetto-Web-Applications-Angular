import {Injectable} from '@angular/core';
import {GameListType, OrderingMode, OrderingType, SearchEventType} from "../enum";
import {GameHandlerService} from "./game-handler.service";
import {DateInterval, searchListener, searchSubject} from "../interfaces";
import {GameRouterHandlerService, ParamType} from "./game-router-handler.service";
import {first} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SearchHandlerService implements searchSubject{
  private currentOrderingType?: OrderingType = OrderingType.METACRITIC;
  private currentOrderingMode?: OrderingMode = OrderingMode.DESCENDED;
  private currentListType?: GameListType;
  private currentName?: string;
  private currentGenre?: string;
  private startDate?: Date = new Date('1969-12-31');
  private endDate?: Date = new Date();
  private latestValues: any[] = [];

  private searchListeners: searchListener[] = [];
  constructor(private gameHandler: GameHandlerService,private gameRouterHandler: GameRouterHandlerService,private datePipe: DatePipe){
    let observable = this.gameRouterHandler.getCurrentParamType();
    observable.pipe(first()).subscribe((result: ParamType) => {
      this.currentOrderingType = result.orderingType;
      this.currentOrderingMode = result.orderingMode;
      this.currentGenre = result.genre;
      this.currentName = result.name;
      if(result.minDate && result.maxDate){
        this.startDate = new Date(result.minDate);
        this.endDate = new Date(result.maxDate);
      }
      if(this.currentOrderingType == undefined && this.currentName == undefined)
          this.currentOrderingType = OrderingType.METACRITIC;
      if(this.currentOrderingMode == undefined && this.currentName == undefined)
          this.currentOrderingMode = OrderingMode.DESCENDED;
    });
  }
  public setCurrentOrderingType(orderingType: OrderingType,search: boolean): any{
    this.currentOrderingType = orderingType;
    this.currentListType = undefined;
    this.currentName = undefined;
    if(search){
      this.performSearch();
    }
  }
  public setCurrentOrderingMode(orderingMode: OrderingMode,search: boolean): any{
    this.currentOrderingMode = orderingMode;
    this.currentListType = undefined;
    this.currentName = undefined;
    if(search){
      this.performSearch();
    }
  }
  public setCurrentGenre(genre: string,search: boolean): void{
    this.currentGenre = genre.toLowerCase();
    this.currentListType = undefined;
    this.currentName = undefined;
    this.currentOrderingType = this.currentOrderingType == null ? OrderingType.METACRITIC : this.currentOrderingType;
    this.currentOrderingMode = this.currentOrderingMode == null ? OrderingMode.DESCENDED : this.currentOrderingMode;
    if(search)
      this.performSearch();
  }
  public setStartDate(startDate: Date,search: boolean): void{
    this.startDate = startDate;
    if(search)
        this.performSearch();
  }
  public setEndDate(endDate: Date,search: boolean): void{
    this.endDate = endDate;
    if(search)
        this.performSearch();
  }
  public setCurrentList(listType: GameListType,search: boolean): void{
    this.currentListType = listType;
    this.currentGenre = undefined;
    this.currentName = undefined;
    switch (listType){
      case GameListType.BEST_RATED:
        this.currentOrderingType = OrderingType.METACRITIC;
        this.currentOrderingMode = OrderingMode.DESCENDED;
        break;
      case GameListType.JUST_RELEASED:
        this.currentOrderingType = OrderingType.RELEASED;
        this.currentOrderingMode = OrderingMode.DESCENDED;
        break;
      case GameListType.SUGGESTED:
        //Non ancora implementato
        return;
    }
    if(search)
      this.performSearch();
  }
  public performSearch(): void{
    let startDate: string | null | undefined = this.datePipe.transform(this.startDate,'yyyy-MM-dd');
    let endDate: string | null | undefined = this.datePipe.transform(this.endDate,'yyyy-MM-dd');
    let interval: DateInterval | undefined  = startDate && endDate ? {startDate: startDate,endDate: endDate} : undefined;
    this.notifyAll(SearchEventType.STARTED);
    if(this.currentListType == undefined)
    {
      if(startDate && endDate)
        this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType,orderingMode: this.currentOrderingMode,genre: this.currentGenre,minDate: startDate,maxDate: endDate});
      else
        this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType,orderingMode: this.currentOrderingMode,genre: this.currentGenre});
      if(this.currentName == null || this.currentName == ""){
        this.gameHandler.search(this.currentOrderingType,this.currentOrderingMode,this.currentGenre,interval).subscribe((result: any) => {
          this.latestValues = result.results;
          this.notifyAll(this.latestValues?.length == 0 ? SearchEventType.FAILED : SearchEventType.COMPLETED);
        })
      }
      else
      {
        this.gameRouterHandler.setParamType({name: this.currentName});
        this.gameHandler.searchByName(this.currentName).subscribe((result: any) => {
          this.latestValues = result.results;
          this.notifyAll(this.latestValues?.length == 0 ? SearchEventType.FAILED : SearchEventType.COMPLETED);
        })
      }
    }
    else
      this.gameHandler.getGameList(this.currentListType).subscribe((result: any) => {
        this.latestValues = result.results;
        this.notifyAll(this.latestValues?.length == 0 ? SearchEventType.FAILED : SearchEventType.COMPLETED);
      })
  }
  public setCurrentName(name: string,search: boolean): void{
    this.currentName = name;
    this.currentListType = undefined;
    this.currentOrderingType = undefined;
    this.currentOrderingMode = undefined;
    this.currentGenre = "";
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
  public getCurrentName(): string | undefined {return this.currentName;}
  public  getStartDate(): Date | undefined {return this.startDate};
  public getEndDate(): Date | undefined {return this.endDate};
}
