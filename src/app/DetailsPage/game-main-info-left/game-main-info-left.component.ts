import {Component, AfterViewInit,Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameInfo} from "../../interfaces";
import {
  faCalendarDays,
  faGlobe, faHeartCirclePlus,
  faStar,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {faReddit} from "@fortawesome/free-brands-svg-icons";
import {SpringHandlerService} from "../../services/spring-handler.service";
import {Subscription, take} from "rxjs";
import {AlertHandlerService} from "../../services/alert-handler.service";
export interface GameLink{
  name: string,
  link?: string,
  icon?: IconDefinition;
}
@Component({
  selector: 'app-game-main-info-left',
  templateUrl: './game-main-info-left.component.html',
  styleUrls: ['./game-main-info-left.component.css']
})
export class GameMainInfoLeftComponent implements OnInit,OnDestroy{
  @Input() gameInfo?: GameInfo;
  public isLogged: boolean = false;
  public icons: IconDefinition[] = [faReddit,faGlobe,faStar,faCalendarDays,faHeartCirclePlus];
  public links: GameLink[] = [];
  private containsGame: boolean = false;
  public currentText: string = "";
  private subscriptions: Subscription[] = [];

  constructor(private springHandler: SpringHandlerService,private alertHandler: AlertHandlerService) {
  }
  public ngOnInit(): void
  {
    if(this.gameInfo)
    {
       this.addItem("Visit website",this.gameInfo.website,faGlobe);
       this.addItem("Visit metacritic",this.gameInfo.metacritic_url,faStar);
       this.addItem("Visit reddit",this.gameInfo.reddit_url,faReddit);
    }
     this.subscriptions.push(this.springHandler.getCurrentUsername(false).subscribe((value: any) => {
       if(value != undefined && this.gameInfo){
         this.isLogged = true;
         this.subscriptions.push(this.springHandler.containsGameWishlist(value.username,this.gameInfo.id).subscribe((value: any) => this.updateText(value)));
       }
     }));
  }
  private addItem(name: string,link: string | undefined,icon? : IconDefinition): void{
    if(link)
      this.links.push({name: name,link: link,icon: icon});
  }
  public handleClick(): void{
    if(this.gameInfo)
    {
      let currentUsername: string = this.springHandler.getCurrentUsername(true).username;
      if(this.containsGame)
        this.subscriptions.push(this.springHandler.removeGameWishlist(currentUsername,this.gameInfo.id).pipe(take(1)).subscribe((value: any) => this.handleResponse(false,true),(error: any) => this.handleResponse(false,false)));
      else if(this.gameInfo.image)
        this.subscriptions.push(this.springHandler.addGameWishlist(currentUsername,this.gameInfo.id).pipe(take(1)).subscribe((value: any) => this.handleResponse(true,true),(error: any) => this.handleResponse(true,false)));
    }
  }
  private handleResponse(value: boolean,success: boolean)
  {
    if(success)
    {
       this.updateText(value);
       let requiredValue: string = value ? "Game successfully added to wishlist" : "Game successfully removed from wishlist";
       this.alertHandler.setAllValues("Wishlist",requiredValue,"OK",true);
    }
    else
    {

    }
  }
  private updateText(value: boolean): void{
    this.containsGame = value;
    this.currentText = this.containsGame ? "Remove from wishlist" : "Add to wishlist";
  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
