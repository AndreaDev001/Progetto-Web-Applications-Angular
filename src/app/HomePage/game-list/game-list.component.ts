import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../services/search-handler.service";
import {Game, searchListener} from "../../interfaces";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit,searchListener{

  public games?: Game[];
  constructor(private searchHandler: SearchHandlerService,private gameJSONReader: GameJSONReaderService){
    this.searchHandler.addListener(this);
  }
  searchCompleted(values: any[]): void {
    this.games = this.gameJSONReader.readGames(values);
    }
    searchFailed(): void {

    }
    searchStarted(): void {

    }
  ngOnInit(): void{
     this.searchHandler.performSearch();
  }
}
