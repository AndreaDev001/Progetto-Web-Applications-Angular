import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../../interfaces";
import {
  faCalendarDays,
  faGlobe, faHeartCirclePlus,
  faStar,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {faReddit} from "@fortawesome/free-brands-svg-icons";
import {SpringHandlerService} from "../../services/spring-handler.service";
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
export class GameMainInfoLeftComponent implements OnInit{
  @Input() gameInfo?: GameInfo;
  @Input() isLogged?: boolean;
  public icons: IconDefinition[] = [faReddit,faGlobe,faStar,faCalendarDays,faHeartCirclePlus];
  public links: GameLink[] = [];
  private containsGame: boolean = false;
  public currentText: string = "";

  constructor(private springHandler: SpringHandlerService) {
  }
  public ngOnInit(): void
  {
    console.log(this.gameInfo);
    if(this.gameInfo)
    {
       this.addItem("Visit website",this.gameInfo.website,faGlobe);
       this.addItem("Visit metacritic",this.gameInfo.metacritic_url,faStar);
       this.addItem("Visit reddit",this.gameInfo.reddit_url,faReddit);
    }
     this.springHandler.getIsLogged(false).subscribe((value: any) => this.isLogged = value);
     this.springHandler.getCurrentUsername(false).subscribe((value: any) => {
       if(value != undefined && this.gameInfo)
          this.springHandler.containsGameWishlist(value,this.gameInfo.id).subscribe((value: any) => this.updateText(value));
     })
  }
  private addItem(name: string,link: string | undefined,icon? : IconDefinition): void{
    if(link)
      this.links.push({name: name,link: link,icon: icon});
  }
  public handleClick(): void{
    if(this.gameInfo)
    {
      let currentUsername: string = this.springHandler.getCurrentUsername(true);
      if(this.containsGame)
        this.springHandler.removeGameWishlist(currentUsername,this.gameInfo.id).subscribe((value: any) => this.updateText(false));
      else
        this.springHandler.addGameWishlist(currentUsername,this.gameInfo.id).subscribe((value: any) => this.updateText(true));
    }
  }
  private updateText(value: boolean): void{
    this.containsGame = value;
    this.currentText = this.containsGame ? "Remove from wishlist" : "Add to wishlist";
  }
}
