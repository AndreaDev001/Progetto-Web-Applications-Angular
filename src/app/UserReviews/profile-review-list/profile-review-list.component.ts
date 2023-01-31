import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {Review, Utente} from "../../interfaces";
import {Router} from "@angular/router";
import {DOMParserService} from "../../services/domparser.service";

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

  constructor(public springHandler: SpringHandlerService,private domParser: DOMParserService,private router: Router) {

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
    for(let current of this.userReviews){
      let value: string | undefined = this.domParser.findFirstText(current.contenuto);
      current.contenuto = value ? value : "Preview not found";
    }
    this.userReviews.sort((first: Review,second: Review) => second.numeroMiPiace - first.numeroMiPiace);
  }
  public handleClick(review: Review): void{
    this.router.navigate(['/recensioni',review.id],{queryParams: this.springHandler.getParams()});
  }
}
