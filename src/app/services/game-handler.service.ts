import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameListType, OrderingMode, OrderingType, RequestType} from "../enum";
import {GameURLBuilderService} from "./game-urlbuilder.service";

@Injectable({
  providedIn: 'root'
})
export class GameHandlerService {

  private readonly apiKEY: string = "aed563e51c174ac48bc71a12195a673e";
  constructor(private httpClient: HttpClient,private gameURLBuilder: GameURLBuilderService) {

  }
  public performRequest(url: string): any{
    return this.httpClient.get(url,{
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
    });
  }
  public search(orderingType?: OrderingType,orderingMode?: OrderingMode,genre?: string): any{
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.GAMES);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    if(orderingType != undefined && orderingMode != undefined)
        this.gameURLBuilder.addOrdering(orderingType,orderingMode);
    if(genre != undefined && genre.length > 0)
        this.gameURLBuilder.addGenre(genre);
    let value: string = this.gameURLBuilder.getURL();
    return this.performRequest(value);
  }
  public searchByName(value: string,orderingType: OrderingType,orderingMode: OrderingMode){
    this.gameURLBuilder.reset();
    this.gameURLBuilder.setRequestType(RequestType.GAMES);
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    this.gameURLBuilder.addSearch(value,true,true);
    if(orderingType != undefined && orderingMode != undefined)
       this.gameURLBuilder.addOrdering(orderingType,orderingMode);
    return this.performRequest(this.gameURLBuilder.getURL());
  }
  public getGameList(listType: GameListType): any{
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
    return this.search(orderingType,orderingMode,"");
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
