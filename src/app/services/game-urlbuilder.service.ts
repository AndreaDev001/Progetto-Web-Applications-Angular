import {Injectable} from '@angular/core';
import {OrderingMode, OrderingType, RequestType} from "../enum";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameURLBuilderService {
  private url: string = "https://api.rawg.io/api/";
  private apiKEY?: string;
  private requestType?: RequestType;
  private currentHttpParams: HttpParams = new HttpParams();
  constructor() {

  }
  public setRequestType(requestType: RequestType): void{
    this.requestType = requestType;
    let regex: RegExp = /\/([a-zA-Z]+)\?/;
    if(regex.test(this.url))
      this.url.replace(regex,requestType + "?");
    else
      this.url += requestType;
  }
  public addDetails(id: number): void{
    if(this.requestType == null)
       throw new Error("Request type must be specified before looking for details");
    let regex: RegExp = /\?key=[a-zA-Z0-9]+/;
    if(regex.test(this.url))
       this.url.replace(regex,"");
    this.url += "/" + id;
  }
  public addAchievements(id: number): void{
    let regex: RegExp = /\/[0-9]+/;
    if(!regex.test(this.url))
         this.addDetails(id);
    this.url += "/achievements";
  }
  public addTrailers(id: number): void{
    let regex: RegExp = /\/[0-9]+/;
    if(!regex.test(this.url))
        this.addDetails(id);
    this.url += "/movies";
  }
  public addStores(id: number): void{
    let regex: RegExp = /\/[0-9]+/;
    if(!regex.test(this.url))
      this.addDetails(id);
    this.url += "/stores";
  }
  public addScreenshots(id: number): void{
    let regex: RegExp = /\/[0-9]+/;
    if(!regex.test(this.url))
      this.addDetails(id);
    this.url += "/screenshots";
  }
  public addAPIKey(apiKEY: string): void{
    this.apiKEY = apiKEY;
    this.currentHttpParams = this.currentHttpParams.append("key",this.apiKEY);
  }
  public validateRequest(): void{
    if(this.requestType == undefined)
        throw new Error("Request type must be specified before adding any query parameter");
    if(this.apiKEY == undefined)
        throw new Error("API Key must be added before adding any query parameter");
  }
  public addOrdering(orderingType: OrderingType,orderingMode: OrderingMode): void{
    this.validateRequest();
    let value: string = (((orderingMode == OrderingMode.DESCENDED)) ? "-" : "") + orderingType;
    this.currentHttpParams = this.currentHttpParams.append("ordering",value);
  }
  public addGenre(genre: string): void{
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("genres",genre);
  }
  public addPage(page: number): void{
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("page",page);
  }
  public addPageSize(pageSize: number){
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("page_size",pageSize);
  }
  public addSearch(name: string,precise: boolean,exact: boolean): void{
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("search",name);
    this.currentHttpParams = this.currentHttpParams.append("search_precise",precise);
    this.currentHttpParams = this.currentHttpParams.append("search_exact",exact);
  }
  public addMetacritic(min: number,max: number): void{
    this.validateRequest();
    let value: string = min + "," + max;
    this.currentHttpParams = this.currentHttpParams.append("metacritic",value);
  }
  public addDates(first: string,second: string): void{
    this.validateRequest();
    let value: string = first + "," + second;
    this.currentHttpParams = this.currentHttpParams.append("dates",value);
  }
  public reset(): void{
    this.url = "https://api.rawg.io/api/";
    this.apiKEY = undefined;
    this.currentHttpParams = new HttpParams();
  }
  public getURL(): {url: string,queryParams: HttpParams} {
    let value = {url: this.url,queryParams: this.currentHttpParams};
    this.reset();
    return value;
  }
}
