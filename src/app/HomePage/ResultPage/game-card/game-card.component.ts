import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../interfaces";
import {faCalendarDays, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {SpringHandlerService} from "../../../services/spring-handler.service";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit{
  @Input() game?: Game;
  public faCalendarDays: IconDefinition = faCalendarDays;
  constructor(public springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void {

  }

  /***
   * Prepara la string contenente tutti i generi
   */
  public getGenres(): string {
    let result: string = "";
    if (this.game?.genres) {
      for (let i = 0; i < this.game.genres.length; i++) {
        let current = this.game.genres[i];
        result += current.name;
        if (i != this.game.genres.length - 1)
          result += ",";
      }
    }
    return result;
  }
}
