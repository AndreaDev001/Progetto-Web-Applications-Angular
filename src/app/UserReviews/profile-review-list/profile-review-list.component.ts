import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {Review, Utente} from "../../interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-review-list',
  templateUrl: './profile-review-list.component.html',
  styleUrls: ['./profile-review-list.component.css']
})
export class ProfileReviewListComponent implements OnInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  public isLogged: boolean = false;
  public owner?: string;
  public userReviews: Review[] = [];

  constructor(public springHandler: SpringHandlerService,private router: Router) {

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: Utente) => {
      this.isLogged = value != null;
      if(value)
      {
        this.owner = value.username;
        this.springHandler.getUserReviews(value.username).subscribe(((values: Review[]) => {
          this.userReviews = values;
          this.formatReviews();
          for(let current of this.userReviews) {
            if (current.gioco)
              this.springHandler.getGame(current.gioco).subscribe((value: any) => current.nomeGioco = value.titolo);
          }
        }));
      }
    }));
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public formatReviews(): void{
    let domParser: DOMParser = new DOMParser();
    for(let current of this.userReviews)
    {
      let document: Document = domParser.parseFromString(current.contenuto,'text/html');
      let all: HTMLCollectionOf<Element> = document.getElementsByTagName("*");
      for(let i = 0;i < all.length;i++){
        let currentElement: Element = all[i];
        if(currentElement.textContent != undefined && currentElement.textContent != "")
          current.contenuto = currentElement.textContent;
      }
    }
    this.userReviews.sort((first: Review,second: Review) => second.numeroMiPiace - first.numeroMiPiace);
  }
  public handleClick(review: Review): void{
    this.router.navigate(['/recensioni',review.id],{queryParams: this.springHandler.getParams()});
  }
}
