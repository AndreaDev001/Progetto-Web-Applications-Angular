import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../game-detail/game-detail.component";
import {faGlobe, faStar, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faReddit} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-game-main-info',
  templateUrl: './game-main-info.component.html',
  styleUrls: ['./game-main-info.component.css']
})
export class GameMainInfoComponent implements OnInit{
  @Input() gameInfo?: GameInfo;
  public icons: IconDefinition[] = [faReddit,faGlobe,faStar];
  constructor() {
  }
  public ngOnInit(): void{

  }
}
