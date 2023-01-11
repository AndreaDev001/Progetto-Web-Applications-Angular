import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../game-detail/game-detail.component";
@Component({
  selector: 'app-game-main-info',
  templateUrl: './game-main-info.component.html',
  styleUrls: ['./game-main-info.component.css']
})
export class GameMainInfoComponent implements OnInit{
  @Input() gameInfo?: GameInfo;
  @Input() isLogged: boolean = false;
  constructor() {
  }
  public ngOnInit(): void{

  }
}
