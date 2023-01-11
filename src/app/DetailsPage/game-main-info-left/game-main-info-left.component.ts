import {Component, Input, OnInit} from '@angular/core';
import {GameInfo} from "../game-detail/game-detail.component";
import {
  faCalendarDays,
  faGlobe, faHeartCirclePlus,
  faStar,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {faReddit} from "@fortawesome/free-brands-svg-icons";
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

  constructor() {
  }
  public ngOnInit(): void{
    if(this.gameInfo){
      this.addItem("Visit website",this.gameInfo.website,faGlobe);
      this.addItem("Visit metacritic",this.gameInfo.metacritic_url,faStar);
      this.addItem("Visit reddit",this.gameInfo.reddit_url,faReddit);
    }
  }
  private addItem(name: string,link: string | undefined,icon? : IconDefinition): void{
    if(link)
      this.links.push({name: name,link: link,icon: icon});
  }
}
