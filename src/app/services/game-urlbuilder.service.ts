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
  //Imposta il tipo attuale di ricerca da effettuare, prende come parametri requestType
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
  //Aggiune una api key all'url, prende come parametro apiKEY
  public addAPIKey(apiKEY: string): void{
    this.apiKEY = apiKEY;
    this.currentHttpParams = this.currentHttpParams.append("key",this.apiKEY);
  }
  //Controlla se l'api key e il tipo di richiesta sono stati impostati
  public validateRequest(): void{
    if(this.requestType == undefined)
        throw new Error("Request type must be specified before adding any query parameter");
    if(this.apiKEY == undefined)
        throw new Error("API Key must be added before adding any query parameter");
  }
  //Aggiunge un tipo di ordinamento all'url, prende come parametro orderingType e orderingMode
  public addOrdering(orderingType: OrderingType,orderingMode: OrderingMode): void{
    this.validateRequest();
    let value: string = (((orderingMode == OrderingMode.DESCENDED)) ? "-" : "") + orderingType;
    this.currentHttpParams = this.currentHttpParams.append("ordering",value);
  }
  //Aggiunge un genere all'url, prende come parametro genre
  public addGenre(genre: string): void{
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("genres",genre);
  }
  //Aggiunge il numero di una pagina all'url, prende come parametro page
  public addPage(page: number): void{
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("page",page);
  }
  //Aggiunge un nome all'url, prende come parametri name, precise e exact
  public addSearch(name: string,precise: boolean,exact: boolean): void{
    this.validateRequest();
    this.currentHttpParams = this.currentHttpParams.append("search",name);
    this.currentHttpParams = this.currentHttpParams.append("search_precise",precise);
    this.currentHttpParams = this.currentHttpParams.append("search_exact",exact);
  }
  //Aggiunge una votazione minima e massima all'url, prende come parametri min e max
  public addMetacritic(min: number,max: number): void{
    this.validateRequest();
    let value: string = min + "," + max;
    this.currentHttpParams = this.currentHttpParams.append("metacritic",value);
  }
  //Aggiunge un intervallo di tempo all'url, prende come parametro first e second
  public addDates(first: string,second: string): void{
    this.validateRequest();
    let value: string = first + "," + second;
    this.currentHttpParams = this.currentHttpParams.append("dates",value);
  }
  //Reimposta l'url attuale
  public reset(): void{
    this.url = "https://api.rawg.io/api/";
    this.apiKEY = undefined;
    this.currentHttpParams = new HttpParams();
  }
  //Ritorna e reimposta l'url attuale
  public getURL(): {url: string,queryParams: HttpParams} {
    let value = {url: this.url,queryParams: this.currentHttpParams};
    this.reset();
    return value;
  }
}
