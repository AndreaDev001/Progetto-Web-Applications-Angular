import {Component, OnDestroy, OnInit} from '@angular/core';
import {Achievement, GameDetails, Review, Screenshot, Store, Trailer, Utente} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";
import {GameHandlerService} from "../../services/game-handler.service";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {StoreLink, GameInfo} from "../../interfaces";
import {Subscription} from "rxjs";
import {faCircleExclamation, IconDefinition} from "@fortawesome/free-solid-svg-icons";

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
  public errorIcon: IconDefinition = faCircleExclamation;

  constructor(private route: ActivatedRoute,private spinnerService: NgxSpinnerService,private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService,public springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void {
    this.getAllValues();
  }
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
            this.springHandler.addGame(this.gameID,genre,this.gameDetails?.original_name,this.gameDetails?.image_background).subscribe((value: any) => console.log(value));
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
  public getValues(values: any[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values){
        result.push(current.name);
      }
    return result;
  }
  public getTrailers(values: Trailer[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values)
        result.push(current.highQuality);
    return result;
  }
  public getStores(values: Store[] | undefined) : string[]{
    let result: string[] = [];
    if(values)
        for(let current of values)
          result.push(current.name)
    return result;
  }
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
  public getGameInfo(): GameInfo | undefined{
    if(this.gameDetails)
      //@ts-ignore
      return {id: this.gameDetails.id,name: this.gameDetails.original_name,description: this.gameDetails.description_raw,rating: this.gameDetails.rating,
      website: this.gameDetails.website,reddit_url: this.gameDetails.reddit_url,image: this.gameDetails.image_background,
      metacritic_url: this.gameDetails.metacritic_url,released: this.gameDetails.releaseDate,esrbRating: this.getEsrbImage(),stores: this.storeLinks,genres: this.getValues(this.gameDetails.genres),platforms: this.getValues(this.gameDetails.platforms)
    };
    return undefined;
  }
  public getEsrbImage(): string | undefined{
    if(this.gameDetails?.esbrRating){
      let esrbSlug: string = this.gameDetails.esbrRating.slug;
      switch (esrbSlug){
        case "teen":
          return "https://www.esrb.org/wp-content/uploads/2019/05/T.svg";
        case "mature":
          return "https://www.esrb.org/wp-content/uploads/2019/05/M.svg";
        case "everyone":
          return "https://www.esrb.org/wp-content/uploads/2019/05/E.svg";
        case "everyone-10-plus":
          return "https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg";
      }
    }
    return undefined;
  }
  private formatReview(value: Review): void{
    let result: string | undefined = this.formatHTML(value.contenuto);
    console.log("Result:" + result);
    value.contenuto = result ? result : value.contenuto;
  }
  private formatHTML(value: string): string | undefined {
    let domParser: DOMParser = new DOMParser();
    let document: Document = domParser.parseFromString(value,'text/html');
    let all: HTMLCollectionOf<Element> = document.body.getElementsByTagName("*");
    for(let i = 0;i < all.length;i++)
    {
      let currentElement: Element = all[i];
      if(currentElement.textContent != undefined && currentElement.textContent != "")
        return currentElement.textContent;
    }
    return "Text not found";
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
