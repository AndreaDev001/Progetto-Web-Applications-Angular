import {Component, Input, OnInit} from '@angular/core';
import {faThumbsDown, faThumbsUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Review} from "../../interfaces";

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.css']
})
export class GameReviewComponent implements OnInit{
  @Input() review?: Review;
  public icons: IconDefinition[] = [faThumbsUp,faThumbsDown];
  public selectedIcon?: IconDefinition;

  constructor() {
  }
  public ngOnInit(){
    this.selectedIcon = this.review && this.review.voto >= 50 ? faThumbsUp : faThumbsDown;
  }
  public createReviewPreview(value: string): string | undefined{
    return value.substring(0,value.length / 2);
  }
}
