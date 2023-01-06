import {Component,OnInit} from '@angular/core';
import {Achievement, GameDetails, Review, Screenshot, Store, Trailer} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";
import {GameHandlerService} from "../../services/game-handler.service";
import {HttpClient} from "@angular/common/http";
import {SpringHandlerService} from "../../services/spring-handler.service";


export interface GameInfo{
  name: string;
  description: string;
  released?: string;
  rating?: number;
  image?: string;
  stores?: string[];
  website?: string;
  reddit_url?: string;
  metacritic_url?: string;
  esrbRating?: string;
  genres?: string[];
  platforms?: string[];
}
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
  public gameTrailers?: Trailer[];
  public gameStores?: Store[];
  public gameReviews?: Review[];

  constructor(private route: ActivatedRoute,private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService,private springHandler: SpringHandlerService) {
  }
  public ngOnInit(): void{
    let value: string | null = this.route.snapshot.paramMap.get("id");
    this.gameID = Number(value);
    this.springHandler.getAllReviews(this.gameID).subscribe((values: Review[]) => {
      console.log(values);
      this.gameReviews = values;
    });
    this.gameHandler.getGameDetails(this.gameID).subscribe((value: any) => this.gameDetails = this.gameJSONReader.readGameDetails(value));
    this.gameHandler.getGameAchievements(this.gameID).subscribe((value: any) => this.gameAchievements = this.gameJSONReader.readAchievements(value.results));
    this.gameHandler.getGameScreenshots(this.gameID).subscribe((value: any) => {
      this.gameScreenshots = this.gameJSONReader.readScreenshots(value.results);
      console.log(this.gameScreenshots)
    });
    this.gameHandler.getGameTrailers(this.gameID).subscribe((value: any) => this.gameTrailers = this.gameJSONReader.readTrailers(value.results));
  }
  public getValues(values: any[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values)
        result.push(current.name);
    return result;
  }
  public getTrailers(values: Trailer[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values)
        result.push(current.highQuality);
    return result;
  }
  public getGameInfo(): GameInfo | undefined{
    if(this.gameDetails && this.gameScreenshots)
      return {name: this.gameDetails.original_name,description: this.gameDetails.description_raw,rating: this.gameDetails.rating,
      website: this.gameDetails.website,reddit_url: this.gameDetails.reddit_url,image: this.gameDetails.image_background,
      metacritic_url: this.gameDetails.metacritic_url,released: this.gameDetails.releaseDate,esrbRating: this.getEsrbImage(),stores: this.getValues(this.gameDetails.stores),genres: this.getValues(this.gameDetails.genres),platforms: this.getValues(this.gameDetails.platforms)
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
