import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {skip, Subscription} from "rxjs";
import {AlertHandlerService} from "../../services/alert-handler.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  public failed: boolean = false;

  constructor(private gameHandler: GameHandlerService,private spinnerService: NgxSpinnerService) {

  }
  public ngOnInit(): void
  {
      this.loadGenres();
  }
  private loadGenres(): void{
    this.spinnerService.show();
    let amount: number = this.gameHandler.getGenres(true) ? 0 : 1;
    this.subscriptions.push(this.gameHandler.getGenres(false).pipe(skip(amount)).subscribe((value: any) => this.spinnerService.hide()))
    this.subscriptions.push(this.gameHandler.getErrorMessage().subscribe((value: any) => {
      this.failed = true;
      this.spinnerService.hide();
    }));
  }
  public ngOnDestroy(): void{
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public handleClick(): void{
    window.location.reload();
  }
}
