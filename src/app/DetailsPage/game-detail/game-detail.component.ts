import {Component,OnInit} from '@angular/core';
import {Achievement,GameDetails, Screenshot, Trailer} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";
import {GameHandlerService} from "../../services/game-handler.service";


export interface GameInfo{
  name: string;
  description: string;
  image?: string;
  website?: string;
  reddit_url?: string;
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
  public getScreenshots(): string[]{
    let values: string[] = [];
    if(this.gameScreenshots)
      for(let current of this.gameScreenshots)
        values.push(current.image);
    return values;
  }
  public getDevelopers(): string[]{
    let values: string[] = [];
    if(this.gameDetails?.developers)
      for(let current of this.gameDetails.developers)
        values.push(current.name);
    return values;
  }
  public getPublishers(): string[]{
    let values: string[] = [];
    if(this.gameDetails?.publishers)
      for(let current of this.gameDetails.publishers)
        values.push(current.name);
    return values;
  }
  public getTags(): string[]{
    let values: string[] = [];
    if(this.gameDetails?.tags)
      for(let current of this.gameDetails.tags)
        values.push(current.name);
    return values;
  }
  public getGameInfo(): GameInfo | undefined{
    if(this.gameDetails && this.gameScreenshots)
      return {name: this.gameDetails.original_name,description: this.gameDetails.description_raw,
      website: this.gameDetails.website,reddit_url: this.gameDetails.reddit_url,image: this.gameScreenshots[0].image};
    return undefined;
  }
  public getGameID(): number | undefined {return this.gameID;}
}
