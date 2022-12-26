import {Injectable} from '@angular/core';
import {GameListType, OrderingMode, OrderingType, SearchEventType} from "../enum";
import {GameHandlerService} from "./game-handler.service";
import {DateInterval, searchListener, searchSubject} from "../interfaces";
import {GameRouterHandlerService, ParamType} from "./game-router-handler.service";
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
    observable.subscribe((result: ParamType) => {
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
      this.performSearch();
    });
  }
  private updateRoute()
  {
     let firstValue: string | null = this.datePipe.transform(this.startDate,'yyyy-MM-dd');
     let secondValue: string | null = this.datePipe.transform(this.endDate,'yyyy-MM-dd');
     if(firstValue && secondValue)
         this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType,orderingMode: this.currentOrderingMode,
         genre: this.currentGenre,name: this.currentName,minDate: firstValue,maxDate: secondValue});
     else
        this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType,orderingMode: this.currentOrderingMode,
        genre: this.currentGenre,name: this.currentName})
  }
  public setCurrentOrderingType(orderingType: OrderingType,search: boolean): any{
    this.currentOrderingType = orderingType;
    this.currentListType = undefined;
    this.currentName = undefined;
    this.updateRoute();
  }
  public setCurrentOrderingMode(orderingMode: OrderingMode,search: boolean): any{
    this.currentOrderingMode = orderingMode;
    this.currentListType = undefined;
    this.currentName = undefined;
    this.updateRoute();
  }
  public setCurrentGenre(genre: string,search: boolean): void{
    this.currentGenre = genre.toLowerCase();
    this.currentListType = undefined;
    this.currentName = undefined;
    this.currentOrderingType = this.currentOrderingType == null ? OrderingType.METACRITIC : this.currentOrderingType;
    this.currentOrderingMode = this.currentOrderingMode == null ? OrderingMode.DESCENDED : this.currentOrderingMode;
    this.updateRoute();
  }
  public setCurrentDate(startDate: Date,endDate: Date){
    this.startDate = startDate;
    this.endDate = endDate;
    let firstValue: string | null = this.datePipe.transform(startDate,'yyyy-MM-dd');
    let secondValue: string | null = this.datePipe.transform(endDate,'yyyy-MM-dd');
    if(firstValue && secondValue)
        this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType,orderingMode: this.currentOrderingMode,
        genre: this.currentGenre,name: this.currentName,minDate: firstValue,maxDate: secondValue})
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
    this.updateRoute();
  }
  public performSearch(): void{
    let startDate: string | null | undefined = this.datePipe.transform(this.startDate,'yyyy-MM-dd');
    let endDate: string | null | undefined = this.datePipe.transform(this.endDate,'yyyy-MM-dd');
    let interval: DateInterval | undefined  = startDate && endDate ? {startDate: startDate,endDate: endDate} : undefined;
    this.notifyAll(SearchEventType.STARTED);
    if(this.currentListType == undefined)
    {
      if(this.currentName == null || this.currentName == ""){
        this.gameHandler.search(this.currentOrderingType,this.currentOrderingMode,this.currentGenre,interval).subscribe((result: any) => {
          this.latestValues = result.results;
          this.notifyAll(this.latestValues?.length == 0 ? SearchEventType.FAILED : SearchEventType.COMPLETED);
        })
      }
      else
      {
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
    this.startDate = undefined;
    this.endDate = undefined;
    this.currentGenre = undefined;
    this.updateRoute();
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
