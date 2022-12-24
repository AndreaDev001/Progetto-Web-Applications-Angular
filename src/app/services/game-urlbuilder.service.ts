import {Injectable} from '@angular/core';
import {OrderingMode, OrderingType, RequestType} from "../enum";

@Injectable({
  providedIn: 'root'
})
export class GameURLBuilderService {
  private url: string = "https://api.rawg.io/api/";
  private apiKEY?: string;
  private requestType?: RequestType;
  constructor() {

  }
  public setRequestType(requestType: RequestType): void{
    this.requestType = requestType;
    let regex: RegExp = /\/([a-zA-Z]+)\?/;
    if(regex.test(this.url))
      this.url.replace(regex,requestType + "?");
    else
      this.url += requestType + "?";
  }
  public addAPIKey(apiKEY: string): void{
    this.apiKEY = apiKEY;
    this.url += "key=" + this.apiKEY;
  }
  public validateRequest(): void{
    if(this.requestType == undefined)
        throw new Error("Request type must be specified before adding any query parameter");
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
  public addSearch(name: string,precise: boolean,exact: boolean): void{
    this.validateRequest();
    this.url += "&search=" + name + "&search_precise=" + precise + "&search_exact=" + exact;
  }
  public addPlatformCount(amount: number): void{
    this.validateRequest();
    this.url += "&platforms_count=" + amount;
  }
  public addMetacritic(min: number,max: number): void{
    this.validateRequest();
    this.url += "&metacritic=" + min + "," + max;
  }
  public addDates(first: string,second: string): void{
    this.validateRequest();
    this.url += "&dates=" + first + "," + second;
  }
  public reset(): void{
    this.url = "https://api.rawg.io/api/";
    this.apiKEY = undefined;
  }
  public getURL(): string {
    let value = this.url;
    this.reset();
    return value;
  }
}
