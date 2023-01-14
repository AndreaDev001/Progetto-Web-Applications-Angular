import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../interfaces";

@Component({
  selector: 'app-game-review-list',
  templateUrl: './game-review-list.component.html',
  styleUrls: ['./game-review-list.component.css']
})
export class GameReviewListComponent implements OnInit {

  @Input() reviews?: Review[];
  @Input() userReview?: Review;

  constructor() {
  }

  public ngOnInit(): void
  {
    this.reviews?.forEach((value: Review) => this.formatReview(value));
    if(this.userReview)
      this.formatReview(this.userReview);
  }
  private formatReview(value: Review): void{
    let result: string | undefined = this.formatHTML(value.contenuto);
    value.contenuto = result ? result : value.contenuto;
  }
  private formatHTML(value: string): string | undefined {
    let domParser: DOMParser = new DOMParser();
    let result: Document = domParser.parseFromString(value, 'text/html');
    let foundElement: HTMLParagraphElement | null = result.body.querySelector("p");
    return foundElement?.innerText;
  }
}

