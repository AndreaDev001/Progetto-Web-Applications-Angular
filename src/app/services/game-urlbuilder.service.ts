import {Injectable} from '@angular/core';
import {OrderingMode, OrderingType} from "../enum";

@Injectable({
  providedIn: 'root'
})
export class GameURLBuilderService {
  private url: string = "https://api.rawg.io/api/games?";
  private apiKEY?: string;
  constructor() {

  }
  public addAPIKey(apiKEY: string): void{
    this.apiKEY = apiKEY;
    this.url += "key=" + this.apiKEY;
  }
  public validateRequest(): void{
    if(this.apiKEY == undefined)
        throw new Error("API Key must be added before adding any query parameter");
  }
  public addOrdering(orderingType: OrderingType,orderingMode: OrderingMode): void{
    this.validateRequest();
    this.url += "&ordering=" + ((orderingMode == OrderingMode.DESCENDED) ? "-" : "") + orderingType;
  }
  public addGenre(genre: string): void{
    this.validateRequest();
    this.url += "&genres=" + genre;
  }
  public addPage(page: number): void{
    this.validateRequest();
    this.url += "&page=" + page;
  }
  public addPageSize(pageSize: number){
    this.validateRequest();
    this.url += "&page_size=" + pageSize;
  }
  public reset(): void{
    this.url = "https://api.rawg.io/api/games?";
    this.apiKEY = undefined;
  }
  public getURL(): string {
    let value = this.url;
    this.reset();
    return value;
  }
}
