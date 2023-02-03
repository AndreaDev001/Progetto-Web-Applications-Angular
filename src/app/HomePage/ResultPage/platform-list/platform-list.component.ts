import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Platform} from "../../../interfaces";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {GameIconTranslatorService} from "../../../services/game-icon-translator.service";

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.css']
})
export class PlatformListComponent implements OnChanges{

  @Input() platforms?: Platform[]
  icons: IconDefinition[] = [];

  constructor(private gameIconTranslator: GameIconTranslatorService) {
  }

  /**
   * Aggiorna la lista attuale quando avvengono delle modifiche
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges) {
    if(this.platforms)
        for(let current of this.platforms){
          let element: IconDefinition | undefined = this.gameIconTranslator.getPlatformIcon(current.slug.toLowerCase(),false);
          if(element)
            this.addItem(this.icons,element);
        }
  }
  /***
   * Aggiunge un'icona ad una lista di icone
   * @param icons La lista di icone a cui aggiungere un'icona
   * @param icon L'icona da aggiungere
   */
  public addItem(icons: IconDefinition[],icon: IconDefinition){
    if(icons.includes(icon))
      return;
    icons.push(icon);
  }
}
