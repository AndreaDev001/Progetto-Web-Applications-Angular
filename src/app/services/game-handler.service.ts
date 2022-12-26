import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameListType, OrderingMode, OrderingType, RequestType} from "../enum";
import {GameURLBuilderService} from "./game-urlbuilder.service";
import { DatePipe } from '@angular/common';
import {DateInterval} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class GameHandlerService {

  private readonly apiKEY: string = "aed563e51c174ac48bc71a12195a673e";
  private readonly minRating: number = 20;
  private readonly maxRating: number = 100;

  constructor(private httpClient: HttpClient,private gameURLBuilder: GameURLBuilderService,private datePipe: DatePipe) {

  }
  public performRequest(url: string): any{
    return this.httpClient.get(url,{
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
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
    let value: string = this.gameURLBuilder.getURL();
    console.log(value);
    return this.performRequest(value);
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
  public getGenres(): any{
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.GENRES);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    return this.performRequest(this.gameURLBuilder.getURL());
  }
  public getPlatforms(): any{
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.PLATFORMS);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    return this.performRequest(this.gameURLBuilder.getURL());
  }
}
