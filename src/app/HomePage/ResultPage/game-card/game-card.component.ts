import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../interfaces";
import {IconDefinition,faCalendarDays} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit{
  @Input() game?: Game;
  public faCalendarDays: IconDefinition = faCalendarDays;
  constructor(){

  }
  ngOnInit(): void{

  }
  public getGenres(): string{
    let result: string = "";
    if(this.game?.genres){
      for(let i = 0;i < this.game.genres.length;i++){
        let current = this.game.genres[i];
        result += current.name;
        if(i != this.game.genres.length - 1)
          result += ",";
      }
    }
    return result;
  }
}