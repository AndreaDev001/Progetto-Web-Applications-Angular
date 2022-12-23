import {Component, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../services/search-handler.service";
import {Game} from "../../interfaces";
import {GameJSONReaderService} from "../../services/game-jsonreader.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  public games?: Game[];
  constructor(private searchHandler: SearchHandlerService,private gameJSONReader: GameJSONReaderService){
  }
  ngOnInit(): void{
    this.searchHandler.performSearch().subscribe((result: any) => {
      this.games = this.gameJSONReader.readGames(result.results);
    });
  }
}
