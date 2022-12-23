import {Component, Input, OnInit} from '@angular/core';
import {Platform} from "../../interfaces";
import {faDesktop, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faAndroid, faApple, faPlaystation, faXbox} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.css']
})
export class PlatformListComponent implements OnInit{

  @Input() platforms?: Platform[]
  icons: IconDefinition[] = [];

  constructor() {
  }
  ngOnInit(): void{
    this.icons = this.getAllIcons();
  }
  getAllIcons(): IconDefinition[]{
    //Implementazione da cambiare,ovviamente quelle di nintendo non ci sono
    let icons: IconDefinition[] = [];
    if(this.platforms){
      for(let current of this.platforms){
        let slug: string = current.slug;
        if(slug.includes('pc'))
          this.addItem(icons,faDesktop);
        if(slug.includes('xbox'))
          this.addItem(icons,faXbox);
        else if(slug.includes('playstation'))
          this.addItem(icons,faPlaystation);
        else if(slug.includes('android'))
          this.addItem(icons,faAndroid);
        else if(slug.includes('ios'))
          this.addItem(icons,faApple);
      }
    }
    return icons;
  }
  addItem(icons: IconDefinition[],icon: IconDefinition){
    if(icons.includes(icon))
      return;
    icons.push(icon);
  }
}
