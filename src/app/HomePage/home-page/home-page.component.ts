import {Component,OnInit} from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {skip} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  constructor(private gameHandler: GameHandlerService,private spinnerService: NgxSpinnerService) {

  }
  public ngOnInit(): void{
    this.spinnerService.show();
    this.gameHandler.getGenres(false).pipe(skip(1)).subscribe((value: any) => this.spinnerService.hide());
  }
}
