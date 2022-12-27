import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../interfaces";
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

  constructor(private route: ActivatedRoute,private gameHandler: GameHandlerService,private gameJSONReader: GameJSONReaderService) {
  }
  public ngOnInit(): void{
    let value: string | null = this.route.snapshot.paramMap.get("id");
    this.gameID = Number(value);
  }
  public getGameID(): number | undefined {return this.gameID;}
}
