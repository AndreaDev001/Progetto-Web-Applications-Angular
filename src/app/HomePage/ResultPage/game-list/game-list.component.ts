import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Game} from "../../../interfaces";
import {GameJSONReaderService} from "../../../services/game-jsonreader.service";
import {Subscription} from "rxjs";
import {GameListType} from "../../../enum";
import {faCircleExclamation, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit,OnDestroy{

  public games: Game[] = [];
  public shouldBeVisible?: boolean;
  private subscriptions: Subscription[] = [];
  public loadingVisible: boolean = false;
  public increasingPage: boolean = false;
  public maxReached: boolean = false;
  public icon: IconDefinition = faCircleExclamation;
  constructor(private searchHandler: SearchHandlerService,private gameJSONReader: GameJSONReaderService){

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: any) => this.loadingVisible = value));
    this.subscriptions.push(this.searchHandler.getLatestValues(false).subscribe((result: any[]) => {
      let currentMaxPage: number = this.searchHandler.getCurrentMaxPage(true);
      if(currentMaxPage == 1){
        this.games = [];
        window.scrollTo(0,0);
      }
      if(result.length > 0)
      {
        let values: Game[] = this.gameJSONReader.readGames(result);
        this.games = this.games.concat(values);
        this.shouldBeVisible = true;
        this.maxReached = false;
      }
      else
      {
        if(currentMaxPage == 1)
        {
          this.games = [];
          this.shouldBeVisible = false;
          this.maxReached = false;
        }
        else
          this.maxReached = true;
      }
    }));
    this.subscriptions.push(this.searchHandler.getIsIncreasingPage(false).subscribe((value: any) => this.increasingPage = value));
  }
  public handleClick(): void
  {
    this.searchHandler.setCurrentList(GameListType.BEST_RATED);
  }
  public scroll(): void{
    if(!this.searchHandler.getIsIncreasingPage(true))
        this.searchHandler.increaseMaxPage();
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}

