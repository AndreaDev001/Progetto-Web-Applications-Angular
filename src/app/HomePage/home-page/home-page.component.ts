import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {skip, Subscription} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  constructor(private gameHandler: GameHandlerService,private spinnerService: NgxSpinnerService) {

  }
  public ngOnInit(): void
  {
      this.spinnerService.show();
      if(!this.gameHandler.getGenres(true))
          this.subscriptions.push(this.gameHandler.getGenres(false).pipe(skip(1)).subscribe((value: any) => this.spinnerService.hide()));
      else
         this.spinnerService.hide();
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
