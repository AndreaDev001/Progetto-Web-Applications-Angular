import {Component,OnInit} from '@angular/core';
import {Achievement,GameDetails, Screenshot, Trailer} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";
import {GameHandlerService} from "../../services/game-handler.service";


export interface GameInfo{
  name: string;
  description: string;
  rating?: number;
  image?: string;
  website?: string;
  reddit_url?: string;
  metacritic_url?: string;
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

  constructor(private route: ActivatedRoute,private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService) {
  }
  public ngOnInit(): void{
    let value: string | null = this.route.snapshot.paramMap.get("id");
    this.gameID = Number(value);
    this.gameHandler.getGameDetails(this.gameID).subscribe((value: any) => {
      console.log(value);
      this.gameDetails = this.gameJSONReader.readGameDetails(value);
      console.log(this.gameDetails);
    });
    this.gameHandler.getGameAchievements(this.gameID).subscribe((value: any) => {
      this.gameAchievements = this.gameJSONReader.readAchievements(value.results)
      console.log(this.gameAchievements);
    });
    this.gameHandler.getGameScreenshots(this.gameID).subscribe((value: any) => this.gameScreenshots = this.gameJSONReader.readScreenshots(value.results));
    this.gameHandler.getGameTrailers(this.gameID).subscribe((value: any) => {
      this.gameTrailers = this.gameJSONReader.readTrailers(value.results);
      console.log(this.gameTrailers);
    });
  }
  public getValues(values: any[] | undefined): string[]{
    let result: string[] = [];
    if(values)
      for(let current of values)
        result.push(current.name);
    return result;
  }
  public getGameInfo(): GameInfo | undefined{
    if(this.gameDetails && this.gameScreenshots)
      return {name: this.gameDetails.original_name,description: this.gameDetails.description_raw,rating: this.gameDetails.rating,
      website: this.gameDetails.website,reddit_url: this.gameDetails.reddit_url,image: this.gameDetails.image_background,
      metacritic_url: this.gameDetails.metacritic_url,genres: this.getValues(this.gameDetails.genres),platforms: this.getValues(this.gameDetails.platforms)
    };
    return undefined;
  }
  public getGameID(): number | undefined {return this.gameID;}
}
