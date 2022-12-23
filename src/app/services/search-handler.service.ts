import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameListType, OrderingMode, OrderingType} from "../enum";
import {GameHandlerService} from "./game-handler.service";

@Injectable({
  providedIn: 'root'
})
export class SearchHandlerService {
  private currentOrderingType?: OrderingType = OrderingType.METACRITIC;
  private currentOrderingMode?: OrderingMode = OrderingMode.DESCENDED;
  private currentListType?: GameListType;
  private currentName?: string;
  private currentGenre?: string;
  constructor(private gameHandler: GameHandlerService,private activatedRoute: ActivatedRoute,private router: Router){
     this.readFromParams();
  }
  private readFromParams(){
    if(this.activatedRoute.snapshot.queryParams['orderingType']) {
      const index = Object.values(OrderingType).indexOf(this.activatedRoute.snapshot.queryParams['orderingType'] as unknown as OrderingType);
      this.currentOrderingType = Object.values(OrderingType)[index];
    }
    if(this.activatedRoute.snapshot.queryParams['orderingMode']) {
      const index = Object.values(OrderingMode).indexOf(this.activatedRoute.snapshot.queryParams['orderingMode'] as unknown as OrderingMode);
      this.currentOrderingMode = Object.values(OrderingMode)[index];
    }
    this.currentGenre = this.activatedRoute.snapshot.queryParams['genre'] != null ? this.activatedRoute.snapshot.queryParams['genre']: null;
  }
  public setCurrentOrderingType(orderingType: OrderingType,search: boolean): any{
    this.currentOrderingType = orderingType;
    this.currentListType = undefined;
    if(search){
      return this.performSearch();
    }
  }
  public setCurrentOrderingMode(orderingMode: OrderingMode,search: boolean): any{
    this.currentOrderingMode = orderingMode;
    this.currentListType = undefined;
    if(search){
      return this.performSearch();
    }
  }
  public setCurrentGenre(genre: string,search: boolean): any{
    this.currentGenre = genre;
    this.currentListType = undefined;
    if(search){
      return this.performSearch();
    }
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
  public setCurrentName(name: string,search: boolean): any{
    this.currentName = name;
    this.currentListType = undefined;
    if(search)
        return this.performSearch();
  }
}
