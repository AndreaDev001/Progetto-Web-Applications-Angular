import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GameInfo} from "../../interfaces";
import {faCalendarDays, faGlobe, faHeartCirclePlus, faStar, IconDefinition} from "@fortawesome/free-solid-svg-icons";
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

  /***
   * Si iscrive agli osservabili necessari e imposta i collegamenti ai siti esterni
   */
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

  /***
   * Aggiune un collegamento
   * @param name Il nome del collegamento
   * @param link Il collegamento effettivo
   * @param icon L'icona del collegamento
   * @private
   */
  private addItem(name: string,link: string | undefined,icon? : IconDefinition): void{
    if(link)
      this.links.push({name: name,link: link,icon: icon});
  }
  /**
   * Gestisce la richiesta dell'utente di aggiungere o rimuovere un gioco alla propria lista dei desideri
   */
  public handleClick(): void{
    if(this.gameInfo)
    {
      let currentUsername: string = this.springHandler.getCurrentUsername(true).username;
      if(this.containsGame)
        this.subscriptions.push(this.springHandler.removeGameWishlist(currentUsername,this.gameInfo.id).pipe(take(1)).subscribe((value: any) => this.handleResponse(false),(error: any) => this.handleResponse(false)));
      else if(this.gameInfo.image)
        this.subscriptions.push(this.springHandler.addGameWishlist(currentUsername,this.gameInfo.id).pipe(take(1)).subscribe((value: any) => this.handleResponse(true),(error: any) => this.handleResponse(true)));
    }
  }

  /***
   * Gestisce la risposta di spring all'aggiunta o la rimozione di un gioco dalla lista dei desideri
   * @param value Se è stato appena aggiunto o rimosso
   * @private
   */
  private handleResponse(value: boolean)
  {
    this.updateText(value);
    let requiredValue: string = value ? "Game successfully added to wishlist" : "Game successfully removed from wishlist";
    this.alertHandler.resetOptions();
    this.alertHandler.addOption({name: "OK",className: "btn btn-lg button button-primary",callback: () => {}});
    this.alertHandler.setAllValues("Wishlist",requiredValue,true);
  }
  /***
   * Aggiorna il testo del pulsante
   * @param value Se bisogna aggiungere o rimuovere il gioco
   * @private
   */
  private updateText(value: boolean): void{
    this.containsGame = value;
    this.currentText = this.containsGame ? "Remove from wishlist" : "Add to wishlist";
  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
