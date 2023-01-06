import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GameListType, OrderingMode, OrderingType, RequestType} from "../enum";
import {GameURLBuilderService} from "./game-urlbuilder.service";
import {DatePipe} from '@angular/common';
import {DateInterval} from "../interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameHandlerService {

  private readonly apiKEY: string = "5bf2185dae9d4756a3c16083fc00de2b";
  private readonly minRating: number = 20;
  private readonly maxRating: number = 100;
  private loadedGenres: BehaviorSubject<any[] | undefined> = new BehaviorSubject<any[] | undefined>(undefined);
  private loadedPlatforms: BehaviorSubject<any[] | undefined> = new BehaviorSubject<any[] | undefined>(undefined);
  constructor(private httpClient: HttpClient,private gameURLBuilder: GameURLBuilderService,private datePipe: DatePipe) {
    this.loadGenres();
    this.loadPlatforms();
  }
  public performRequest(value: {url: string,queryParams: HttpParams}): any{
    return this.httpClient.get(value.url,{
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
      params: value.queryParams,
    });
  }
  public search(orderingType?: OrderingType,orderingMode?: OrderingMode,genre?: string,requiredPage?: number,dateInterval?: DateInterval): any{
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.GAMES);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    if(requiredPage)
      this.gameURLBuilder.addPage(requiredPage);
    this.gameURLBuilder.addMetacritic(this.minRating,this.maxRating);
    if(orderingType != undefined && orderingMode != undefined)
      this.gameURLBuilder.addOrdering(orderingType,orderingMode);
    if(genre != undefined && genre.length > 0)
      this.gameURLBuilder.addGenre(genre);
    if(dateInterval != null)
      this.gameURLBuilder.addDates(dateInterval.startDate,dateInterval.endDate);
    return this.performRequest(this.gameURLBuilder.getURL());
  }
  public searchByName(value: string,requiredPage?: number){
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.GAMES);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    if(requiredPage)
      this.gameURLBuilder.addPage(requiredPage);
    this.gameURLBuilder.addSearch(value,false,false);
    this.gameURLBuilder.addMetacritic(20,100);
    return this.performRequest(this.gameURLBuilder.getURL());
  }
  public getGameList(listType: GameListType,requiredPage?: number,dateInterval?: DateInterval): any{
    let orderingType: OrderingType = OrderingType.NAME;
    let orderingMode: OrderingMode = OrderingMode.DESCENDED;
    switch (listType){
      case GameListType.BEST_RATED:
        orderingType = OrderingType.METACRITIC;
        orderingMode = OrderingMode.DESCENDED;
        break;
      case GameListType.JUST_RELEASED:
        orderingType = OrderingType.RELEASED;
        orderingMode = OrderingMode.DESCENDED;
        break;
      case GameListType.SUGGESTED:
        break;
    }
    return this.search(orderingType,orderingMode,"",requiredPage);
  }
  private loadGenres(): void{
    this.gameURLBuilder.reset()
    this.gameURLBuilder.setRequestType(RequestType.GENRES);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    this.performRequest(this.gameURLBuilder.getURL()).subscribe((result: any) => this.loadedGenres.next(result.results));
  }
  private loadPlatforms(): void{
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.PLATFORMS);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    this.performRequest(this.gameURLBuilder.getURL()).subscribe((result: any) => this.loadedPlatforms.next(result.results));
  }
  public getGenres(value: boolean): any {return value ? this.loadedGenres.value : this.loadedGenres};
  public getPlatforms(value: boolean): any {return value ? this.loadedPlatforms.value : this.loadedPlatforms};
}