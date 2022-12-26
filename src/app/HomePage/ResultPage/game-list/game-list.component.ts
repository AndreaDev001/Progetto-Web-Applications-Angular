import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {Game, searchListener} from "../../../interfaces";
import {GameJSONReaderService} from "../../../services/game-jsonreader.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  public games?: Game[];
  public shouldBeVisible?: boolean;
  constructor(private searchHandler: SearchHandlerService,private gameJSONReader: GameJSONReaderService){

  }
  ngOnInit(): void{
    this.searchHandler.latestValues.subscribe((result: any[]) => {
      if(result.length > 0){
        this.games = this.gameJSONReader.readGames(result);
        this.shouldBeVisible = true;
        return;
      }
      this.shouldBeVisible = false;
    })
  }
  public handleClick(): void{
    this.searchHandler.setCurrentGenre("action",true);
  }
}

