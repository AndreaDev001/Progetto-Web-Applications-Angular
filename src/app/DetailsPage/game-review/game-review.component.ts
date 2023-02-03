import {Component, Input, OnInit} from '@angular/core';
import {faThumbsDown, faThumbsUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Review} from "../../interfaces";
import {SpringHandlerService} from "../../services/spring-handler.service";

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.css']
})
export class GameReviewComponent implements OnInit{
  @Input() review?: Review;
  public icons: IconDefinition[] = [faThumbsUp,faThumbsDown];
  public selectedIcon?: IconDefinition;

  constructor(public springHandler: SpringHandlerService) {
  }

  /***
   * Aggiorna l'icona in base al voto
   */
  public ngOnInit(){
    this.selectedIcon = this.review && this.review.voto >= 6 ? faThumbsUp : faThumbsDown;
  }
}
