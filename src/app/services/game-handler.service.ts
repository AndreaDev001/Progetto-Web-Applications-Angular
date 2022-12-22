import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameListType, OrderingMode, OrderingType} from "../enum";
import {GameURLBuilderService} from "./game-urlbuilder.service";

@Injectable({
  providedIn: 'root'
})
export class GameHandlerService {

  private readonly apiKEY: string = "aed563e51c174ac48bc71a12195a673e";
  constructor(private httpClient: HttpClient,private gameURLBuilder: GameURLBuilderService) {

  }
  private performRequest(url: string): any{
    return this.httpClient.get(url,{
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
    });
  }
  public search(orderingType: OrderingType,orderingMode: OrderingMode,genre: string): any{
    this.gameURLBuilder.reset();
    this.gameURLBuilder.addAPIKey(this.apiKEY);
    this.gameURLBuilder.addOrdering(orderingType,orderingMode);
    if(genre.length > 0)
        this.gameURLBuilder.addGenre(genre);
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
}
