import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Review, Utente} from "../../interfaces";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

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
  public isBanned: boolean = false;
  public currentText = "";
  public currentButtonText = "";
  private subscriptions: Subscription[] = [];

  constructor(public springHandler: SpringHandlerService, private router: Router) {

  }

  /***
   * Si iscrive a tutti gli osservabili necessari
   */
  public ngOnInit(): void
  {
    this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: Utente) => {
      this.isLogged = value != undefined;
      if(value != undefined)
        this.isBanned = value.bandito;
      this.currentText = this.createText();
      this.currentButtonText = this.createButtonText();
    }));
  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  /***
   * Effettua un ordinamento delle recensioni quando esse cambiano
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void{
    if(this.reviews)
      this.reviews = this.reviews.sort((first: Review,second: Review) => second.voto - first.voto);
  }

  /***
   * Aggiorna il testo sotto il pulsante
   */
  public createText(): string{
    if(this.isLogged && !this.isBanned && !this.userReview)
      return "You haven't written a review on this game yet";
    else if(this.isLogged && this.userReview)
      return "";
    else if(this.isLogged && this.isBanned)
      return "Banned accounts can't write reviews";
    else if(!this.isLogged)
      return "To write a review you need to be logged in";
    return "Text";
  }

  /***
   * Aggiorna il testo del pulsante
   */
  public createButtonText(): string{
    if(this.isLogged && this.isBanned)
      return "Back to home page";
    if(this.isLogged && !this.isBanned && !this.userReview)
      return "Write a new review";
    if(!this.isLogged)
      return "Login";
    return "Button Text";
  }

  /***
   * Gestisce il click sul pulsante
   */
  public handleClick(): void{
    if(!this.isLogged)
      window.open("http://localhost:8080/login","_self");
    if(this.isLogged && this.isBanned)
      this.router.navigate(["/games"],{queryParams: this.springHandler.getParams()});
    else if(this.isLogged && !this.isBanned && !this.userReview)
      this.router.navigate(["../../" + this.gameID + "/newRecensione"],{queryParams: this.springHandler.getParams()})
  }
}

