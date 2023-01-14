import {Component,OnInit} from '@angular/core';
import {Achievement, GameDetails, Review, Screenshot, Store, Trailer} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";
import {GameHandlerService} from "../../services/game-handler.service";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {StoreLink, GameInfo} from "../../interfaces";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit{

  private gameID?: number;
  public gameDetails?: GameDetails;
  public gameAchievements?: Achievement[];
  public gameScreenshots?: Screenshot[];
  public storeLinks: StoreLink[] = [];
  public gameTrailers?: Trailer[];
  public gameReviews?: Review[];
  public userReview?: Review;

  constructor(private route: ActivatedRoute,private spinnerService: NgxSpinnerService,private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService,private springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void {
    this.spinnerService.show();
    let gameId: string | null = this.route.snapshot.paramMap.get("id");this.gameID = Number(gameId);
    this.springHandler.forceLogin("AndreaDev01","123456");
    this.springHandler.getCurrentUsername(false).subscribe((value: any) => {
      if(value != undefined && this.gameID)
        this.springHandler.getUserReview(value,this.gameID).subscribe((value: Review) => this.userReview = value);
    })
    this.getAllValues();
  }
  private getAllValues(): void{
    if(!this.gameID)
      return;
    this.springHandler.getReviews(this.gameID).subscribe((values: Review[]) => this.gameReviews = values);
    this.gameHandler.getGameDetails(this.gameID).subscribe((value: any) => {
      this.gameDetails = this.gameJSONReader.readGameDetails(value);
      if(this.gameID)
      {
        this.springHandler.existsGame(this.gameID).subscribe((value: boolean) => {
          let genre: string | undefined = this.gameDetails?.genres[0].slug;
          if(this.gameID && genre)
            this.springHandler.addGame(this.gameID,genre).subscribe((value: any) => console.log(value));
        })
        this.gameHandler.getGameStores(this.gameID).subscribe((value: any) => this.createStoreLinks(value.results));
      }
      this.spinnerService.hide();
    });
    this.gameHandler.getGameAchievements(this.gameID).subscribe((value: any) => this.gameAchievements = this.gameJSONReader.readAchievements(value.results));
    this.gameHandler.getGameScreenshots(this.gameID).subscribe((value: any) => this.gameScreenshots = this.gameJSONReader.readScreenshots(value.results));
    this.gameHandler.getGameTrailers(this.gameID).subscribe((value: any) => this.gameTrailers = this.gameJSONReader.readTrailers(value.results));
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
  public getGameID(): number | undefined {return this.gameID;}
}
