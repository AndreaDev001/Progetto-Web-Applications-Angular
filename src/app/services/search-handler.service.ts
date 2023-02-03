import {Injectable} from '@angular/core';
import {GameListType, OrderingMode, OrderingType} from "../enum";
import {GameHandlerService} from "./game-handler.service";
import {DateInterval} from "../interfaces";
import {GameRouterHandlerService, ParamType} from "./game-router-handler.service";
import {DatePipe} from "@angular/common";
import {BehaviorSubject,Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchHandlerService
{
  private currentOrderingType: BehaviorSubject<OrderingType | undefined> = new BehaviorSubject<OrderingType | undefined>(undefined);
  private currentOrderingMode: BehaviorSubject<OrderingMode | undefined> = new BehaviorSubject<OrderingMode | undefined>(undefined);
  private currentListType: BehaviorSubject<GameListType | undefined> = new BehaviorSubject<GameListType | undefined>(undefined);
  private currentName: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private currentGenre: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private startDate: BehaviorSubject<Date | undefined> = new BehaviorSubject<Date | undefined>(new Date('1970-12-31'));
  private endDate:BehaviorSubject<Date | undefined> = new BehaviorSubject<Date | undefined>(new Date());
  private currentMaxPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public latestValues: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private isSearching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isIncreasingPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentSubscription?: Subscription;

  constructor(private gameHandler: GameHandlerService,private gameRouterHandler: GameRouterHandlerService,private datePipe: DatePipe) {
    this.handleParams();
  }

  /***
   * Si iscrive al gameRouterHandler e legge i parametri
   * @private
   */
  private handleParams(): void
  {
      this.gameRouterHandler.getCurrentParamType().subscribe((result: ParamType) => {
        this.currentName.next(result.name);
        if(!this.currentListType.value && !this.currentName.value){
          this.currentOrderingType.next((!result.orderingType || !result.orderingMode) ? OrderingType.METACRITIC : result.orderingType);
          this.currentOrderingMode.next((!result.orderingType || !result.orderingMode) ? OrderingMode.DESCENDED: result.orderingMode);
          this.currentGenre.next(result.genre ? result.genre : "action");
          this.startDate.next((result.minDate && result.maxDate) ? new Date(result.minDate) : new Date(0));
          this.endDate.next((result.minDate && result.maxDate) ? new Date(result.maxDate) : new Date());
        }
        this.currentMaxPage.next(1);
        this.performSearch(true);
      });
  }

  /***
   * Utilizzando gameRouterHandler aggiorna il route attuale in base ai filtri selezionati attualmente
   * @private
   */
  private updateRoute()
  {
     let firstValue: string | null = this.datePipe.transform(this.startDate.value,'yyyy-MM-dd');
     let secondValue: string | null = this.datePipe.transform(this.endDate.value,'yyyy-MM-dd');
     if(firstValue && secondValue)
         this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType.value,orderingMode: this.currentOrderingMode.value,
         genre: this.currentGenre.value,name: this.currentName.value,minDate: firstValue,maxDate: secondValue});
     else
        this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType.value,orderingMode: this.currentOrderingMode.value,
        genre: this.currentGenre.value,name: this.currentName.value})
  }

  /***
   * Imposta il tipo di ordinamento attuale
   * @param orderingType Il nuovo tipo di ordinamento
   */
  public setCurrentOrderingType(orderingType: OrderingType): any{
    this.currentOrderingType.next(orderingType);
    this.currentListType.next(undefined);
    this.currentMaxPage.next(1);
    this.currentName.next(undefined);
    this.update();
  }

  /**
   * Imposta la modalità di ordinamento attuale
   * @param orderingMode La nuova modalità di ordinamento
   */
  public setCurrentOrderingMode(orderingMode: OrderingMode): any{
    this.currentOrderingMode.next(orderingMode);
    this.currentListType.next(undefined);
    this.currentMaxPage.next(1);
    this.currentName.next(undefined);
    this.update();
  }

  /***
   * Imposta il genere attuale
   * @param genre Il nuovo genere
   */
  public setCurrentGenre(genre: string): void{
    this.currentGenre.next(genre.toLowerCase());
    this.currentListType.next(undefined);
    this.currentName.next(undefined);
    this.currentMaxPage.next(1);
    this.currentOrderingType.next(this.currentOrderingType .value== null ? OrderingType.METACRITIC : this.currentOrderingType.value);
    this.currentOrderingMode.next(this.currentOrderingMode.value == null ? OrderingMode.DESCENDED : this.currentOrderingMode.value);
    this.update();
  }

  /***
   * Si assicura che l'intervallo di tempo attuale non sia nullo
   * @private
   */
  private validateDates(){
    if(this.startDate.value == undefined || this.endDate.value == undefined){
      this.startDate.next(new Date('1970-12-31'));
      this.endDate.next(new Date());
    }
  }
  /***
   * Imposta l'intervallo di tempo attuale
   * @param startDate Data di inizio
   * @param endDate Data di fine
   */
  public setCurrentDate(startDate: Date,endDate: Date){
    this.startDate.next(startDate);
    this.endDate.next(endDate);
    this.currentMaxPage.next(1);
    let firstValue: string | null = this.datePipe.transform(startDate,'yyyy-MM-dd');
    let secondValue: string | null = this.datePipe.transform(endDate,'yyyy-MM-dd');
    if(firstValue && secondValue)
        this.gameRouterHandler.setParamType({orderingType: this.currentOrderingType.value,orderingMode: this.currentOrderingMode.value,
        genre: this.currentGenre.value,name: this.currentName.value,minDate: firstValue,maxDate: secondValue})
  }

  /***
   * Imposta il tipo di lista attuale
   * @param listType Il nuovo tipo di lista
   */
  public setCurrentList(listType: GameListType): void{
    this.currentListType.next(listType);
    this.currentGenre.next(undefined);
    this.currentName.next(undefined);
    this.startDate.next(undefined);
    this.endDate.next(undefined);
    this.currentMaxPage.next(1);
    switch (listType){
      case GameListType.BEST_RATED:
        this.currentOrderingType.next(OrderingType.METACRITIC);
        this.currentOrderingMode.next(OrderingMode.DESCENDED);
        break;
      case GameListType.JUST_RELEASED:
        this.currentOrderingType.next(OrderingType.RELEASED);
        this.currentOrderingMode.next(OrderingMode.DESCENDED);
        break;
    }
    this.update();
  }

  /**
   * Si assicura che l'intervallo di tempo non sia nullo e aggiorna il route attuale
   * @private
   */
  private update(): void{
    this.validateDates();
    this.updateRoute();
  }

  /**+
   * Richiede i risultati di una ricerca al gameHandler
   * @param updateIsSearching Se mostrare o meno una schermata di caricamento
   */
  public performSearch(updateIsSearching: boolean): void{
    let startDate: string | null | undefined = this.datePipe.transform(this.startDate.value,'yyyy-MM-dd');
    let endDate: string | null | undefined = this.datePipe.transform(this.endDate.value,'yyyy-MM-dd');
    let interval: DateInterval | undefined  = startDate && endDate ? {startDate: startDate,endDate: endDate} : undefined;
    if(this.currentSubscription != undefined)
      this.currentSubscription.unsubscribe();
    if(updateIsSearching)
       this.isSearching.next(true);
    else
       this.isIncreasingPage.next(true);
    if(this.currentListType.value == undefined)
    {
      if(this.currentName.value == null || this.currentName.value == "")
        this.currentSubscription = this.gameHandler.search(this.currentOrderingType.value,this.currentOrderingMode.value,this.currentGenre.value,this.currentMaxPage.value,interval).subscribe((result: any) => this.updateResults(result.results,false),(error: any) => this.resetSearching());
      else
        this.currentSubscription = this.gameHandler.searchByName(this.currentName.value,this.currentMaxPage.value).subscribe((result: any) => this.updateResults(result.results,false),(error: any) => this.resetSearching());
    }
    else
      this.currentSubscription = this.gameHandler.getGameList(this.currentListType.value,this.currentMaxPage.value).subscribe((result: any) => this.updateResults(result.results,false),(error: any) => this.resetSearching());
  }

  /**
   * Reimposta la ricerca attuale, ripristina isSearching, isIncreasingPage e latestValues
   * @private
   */
  private resetSearching(): void{
    this.isSearching.next(false);
    this.isIncreasingPage.next(false);
    this.latestValues.next([]);
  }

  /**
   * Aggiorna i risultati di una ricerca
   * @param values I nuovi risultati di una ricerca
   * @param searchingValue Se mostrare una schermata di caricamento
   * @private
   */
  private updateResults(values: any[],searchingValue: boolean){
    this.latestValues.next(values);
    this.isSearching.next(searchingValue);
    this.isIncreasingPage.next(false);
  }

  /**
   * Aumenta di uno il numero di pagina attuale
   */
  public increaseMaxPage(){
    this.currentMaxPage.next(this.currentMaxPage.value + 1);
    this.performSearch(false);
  }

  /***
   * Imposta il nome attuale di una ricerca
   * @param name Il nuovo nome della ricerca
   */
  public setCurrentName(name: string): void{
    this.currentName.next(name);
    this.currentMaxPage.next(1);
    this.currentListType.next(undefined);
    this.currentOrderingType.next(undefined);
    this.currentOrderingMode.next(undefined);
    this.startDate.next(undefined);
    this.endDate.next(undefined);
    this.currentGenre.next(undefined);
    this.updateRoute();
  }
  public getCurrentGenre(value: boolean): any {return value ? this.currentGenre.value : this.currentGenre}
  public getCurrentOrderingType(value: boolean): any {return value ? this.currentOrderingType.value : this.currentOrderingType};
  public getCurrentOrderingMode(value: boolean): any {return value ? this.currentOrderingMode.value : this.currentOrderingMode;}
  public getCurrentName(value: boolean): any {return value ? this.currentName.value : this.currentName}
  public getCurrentMaxPage(value: boolean): any {return value ? this.currentMaxPage.value : this.currentMaxPage}
  public getStartDate(value: boolean): any {return value ? this.startDate.value : this.startDate};
  public getEndDate(value: boolean): any {return value ? this.endDate.value : this.endDate};
  public getLatestValues(value: boolean): any {return value ? this.latestValues.value : this.latestValues};
  public getIsSearching(value: boolean): any {return value ? this.isSearching.value : this.isSearching};
  public getCurrentList(value: boolean): any {return value ? this.currentListType.value : this.currentListType};
  public getIsIncreasingPage(value: boolean): any {return value ? this.isIncreasingPage.value : this.isIncreasingPage};
}
