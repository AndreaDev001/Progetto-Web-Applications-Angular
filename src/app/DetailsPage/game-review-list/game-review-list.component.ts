import {Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {Review} from "../../interfaces";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game-review-list',
  templateUrl: './game-review-list.component.html',
  styleUrls: ['./game-review-list.component.css']
})
export class GameReviewListComponent implements OnInit,OnDestroy{
  @Input() gameID?: number;
  @Input() reviews?: Array<Review>;
  @Input() userReview?: Review;
  public isLogged: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(public springHandler: SpringHandlerService) {

  }
  public ngOnInit(): void
  {
    this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: string) => this.isLogged = value != undefined));
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public ngOnChanges(changes: SimpleChanges): void{
    if(this.reviews)
      this.reviews = this.reviews.sort((first: Review,second: Review) => second.voto - first.voto);
  }
  public goToLogin(): void{
    window.open("http://localhost:8080/login","_self");
  }
}

