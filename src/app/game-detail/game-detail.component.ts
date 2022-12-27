import {Component, Input, OnInit} from '@angular/core';
import {Achievement, Game, GameDetails, Screenshot, Trailer} from "../interfaces";
import {ActivatedRoute} from "@angular/router";
import {GameJSONReaderService} from "../services/game-jsonreader.service";
import {GameHandlerService} from "../services/game-handler.service";

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
      this.gameDetails = this.gameJSONReader.readGameDetails(value);
      console.log(this.gameDetails);
    });
    this.gameHandler.getGameAchievements(this.gameID).subscribe((value: any) => this.gameAchievements = this.gameJSONReader.readAchievements(value.results));
    this.gameHandler.getGameScreenshots(this.gameID).subscribe((value: any) => this.gameScreenshots = this.gameJSONReader.readScreenshots(value.results));
    this.gameHandler.getGameTrailers(this.gameID).subscribe((value: any) => {
      this.gameTrailers = this.gameJSONReader.readTrailers(value.results);
      console.log(this.gameTrailers);
    });
  }
  public getGameID(): number | undefined {return this.gameID;}
}
