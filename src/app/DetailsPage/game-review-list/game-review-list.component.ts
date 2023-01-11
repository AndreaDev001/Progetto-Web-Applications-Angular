import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../interfaces";

@Component({
  selector: 'app-game-review-list',
  templateUrl: './game-review-list.component.html',
  styleUrls: ['./game-review-list.component.css']
})
export class GameReviewListComponent implements OnInit{
  @Input() reviews? : Review[];
  @Input() userReview?: Review;

  constructor() {
  }
  public ngOnInit(): void{

  }
}
