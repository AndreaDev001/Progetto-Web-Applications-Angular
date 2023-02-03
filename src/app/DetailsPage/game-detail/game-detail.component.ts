import {Component, OnDestroy, OnInit} from '@angular/core';
import {Achievement, GameDetails, Review, Screenshot, Store, Trailer} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";
import {GameHandlerService} from "../../services/game-handler.service";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {StoreLink, GameInfo} from "../../interfaces";
import {Subscription} from "rxjs";
import {DOMParserService} from "../../services/domparser.service";
import {GameIconTranslatorService} from "../../services/game-icon-translator.service";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit,OnDestroy{

  public gameID?: number;
  public gameDetails?: GameDetails;
  public gameAchievements?: Achievement[];
  public gameScreenshots?: Screenshot[];
  public storeLinks: StoreLink[] = [];
  public gameTrailers?: Trailer[];
  public gameReviews?: Review[];
  public userReview?: Review;
  private subscriptions: Subscription[] = [];
  public failed: boolean = false;
  constructor(private route: ActivatedRoute,private spinnerService: NgxSpinnerService,private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService,private domParser: DOMParserService,private iconTranslator: GameIconTranslatorService,public springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void {
    this.getAllValues();
  }

  /***
   * Prende tutte le informazioni aggiuntive da mostrare all'utente
   * @private
   */
  private getAllValues(): void{
    this.spinnerService.show();
    let gameId: string | null = this.route.snapshot.paramMap.get("id");
    this.gameID = Number(gameId);
    this.subscriptions.push(this.gameHandler.getGameDetails(this.gameID).subscribe((value: any) => {
      this.gameDetails = this.gameJSONReader.readGameDetails(value);
      if(this.gameID)
      {
        this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: any) => {
          if(value != undefined && this.gameID)
            this.springHandler.getUserReview(value.username,this.gameID).subscribe((value: Review) => {
              this.userReview = value;
              this.formatReview(this.userReview);
            });
        }));
        this.subscriptions.push(this.springHandler.getReviews(this.gameID).subscribe((values: Review[]) => {
          this.gameReviews = values;
          this.gameReviews.forEach((value: Review) => this.formatReview(value));
        }));
        this.subscriptions.push(this.springHandler.existsGame(this.gameID).subscribe((value: boolean) => {
          let genre: string | undefined = this.gameDetails?.genres[0].slug;
          if(this.gameID && genre && this.gameDetails)
            this.springHandler.addGame(this.gameID,genre,this.gameDetails?.original_name,this.gameDetails?.image_background).subscribe((value: any) => {});
        }));
        this.subscriptions.push(this.gameHandler.getGameStores(this.gameID).subscribe((value: any) => this.createStoreLinks(value.results)));
        this.subscriptions.push(this.gameHandler.getGameAchievements(this.gameID).subscribe((value: any) => this.gameAchievements = this.gameJSONReader.readAchievements(value.results)));
        this.subscriptions.push(this.gameHandler.getGameScreenshots(this.gameID).subscribe((value: any) => this.gameScreenshots = this.gameJSONReader.readScreenshots(value.results)));
        this.subscriptions.push(this.gameHandler.getGameTrailers(this.gameID).subscribe((value: any) => this.gameTrailers = this.gameJSONReader.readTrailers(value.results)));
      }
      this.spinnerService.hide();
    },(error: any) => {
      this.failed = true;
      this.spinnerService.hide();
    }));
  }

  /**
   * Esegue una formattazione di dati contenuti in una array
   * @param values L'array contenente i dati
   */
  public getValues(values: any[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values){
        result.push(current.name);
      }
    return result;
  }

  /***
   * Ottiene tutti i trailer di un gioco come stringhe
   * @param values Array contenente i trailer
   */
  public getTrailers(values: Trailer[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values)
        result.push(current.highQuality);
    return result;
  }

  /***
   * Crea i link di collegamento alla pagine dove è possibile acquistare il gioco
   * @param values Gli url dei giochi
   */
  public createStoreLinks(values: any): void{
    for(let current of values)
    {
      let url: string = current.url;
      let store_id: number = current.store_id;
      this.gameDetails?.stores?.forEach((value: Store) => {
        if(value.id == store_id){
          let storeLink: StoreLink = {name: value.name,link: url};
          this.storeLinks.push(storeLink);
        }
      })
    }
  }

  /***
   * Ritorna un oggetto con meno informazioni di GameDetails da passare ai figli di questo componente
   */
  public getGameInfo(): GameInfo | undefined
  {
    //Da rimuovere il ts-ignore
    if(this.gameDetails)
      return {id: this.gameDetails.id,name: this.gameDetails.original_name,description: this.gameDetails.description_raw,rating: this.gameDetails.rating,
      website: this.gameDetails.website,reddit_url: this.gameDetails.reddit_url,image: this.gameDetails.image_background,
      metacritic_url: this.gameDetails.metacritic_url,released: this.gameDetails.releaseDate,esrbRating: this.iconTranslator.getEsrbImage(this.gameDetails.esbrRating?.slug),stores: this.storeLinks,genres: this.getValues(this.gameDetails.genres),platforms: this.getValues(this.gameDetails.platforms)
    };
    return undefined;
  }

  /***
   * Formattazione delle recensioni
   * @param review La recensione da formattare
   * @private
   */
  private formatReview(review: Review){
    let text: string | undefined = this.domParser.findFirstText(review.contenuto);
    review.contenuto = text ? text : "No preview found";
  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
