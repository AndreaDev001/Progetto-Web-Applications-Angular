import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Review} from "../../interfaces";
import {SpringHandlerService} from "../../services/spring-handler.service";

@Component({
  selector: 'app-game-review-list',
  templateUrl: './game-review-list.component.html',
  styleUrls: ['./game-review-list.component.css']
})
export class GameReviewListComponent implements OnInit {
  @Input() gameID?: number;
  @Input() reviews?: Array<Review>;
  @Input() userReview?: Review;

  constructor(public springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void
  {

  }
  public ngOnChanges(changes: SimpleChanges): void{
    if(this.reviews)
      this.reviews = this.reviews.sort((first: Review,second: Review) => second.voto - first.voto);
  }
}

