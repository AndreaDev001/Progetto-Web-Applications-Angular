import {Component, HostListener, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Game} from "../../../interfaces";
import {GameJSONReaderService} from "../../../services/game-jsonreader.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  public games: Game[] = [];
  public shouldBeVisible?: boolean;
  private scrollableDiv?: HTMLElement;
  constructor(private searchHandler: SearchHandlerService,private gameJSONReader: GameJSONReaderService){

  }
  public ngOnInit(): void{
    this.searchHandler.getCurrentMaxPage().subscribe((result: number | undefined) => {
      if(result == 1){
        this.games = [];
        this.scrollableDiv?.scrollTo(0,0);
        window.scrollTo(0,0);
      }
    })
    this.searchHandler.latestValues.subscribe((result: any[]) => {
      if(result.length > 0){
        let values: Game[] = this.gameJSONReader.readGames(result);
        for(let current of values)
           this.games?.push(current);
        this.shouldBeVisible = true;
        return;
      }
      this.shouldBeVisible = false;
    })
  }
  public handleClick(): void{
    this.searchHandler.setCurrentGenre("action");
  }
  public scroll(event: any): void{
    const target = event.target;
    if(this.scrollableDiv == undefined)
      this.scrollableDiv = target;
    if((target.scrollHeight - target.scrollTop) === target.clientHeight)
        this.searchHandler.increaseMaxPage();
  }
}

