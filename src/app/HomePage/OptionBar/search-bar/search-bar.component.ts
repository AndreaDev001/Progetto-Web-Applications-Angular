import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHandlerService} from "../../../services/search-handler.service";
import {GameListType} from "../../../enum";
import {faSearch, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit,OnDestroy{
  public currentName?: string;
  public searchIcon: IconDefinition = faSearch;
  private textField: HTMLInputElement | null = null;
  private subscriptions: Subscription[] = [];
  constructor(private searchHandler: SearchHandlerService) {
  }

  /***
   * Si iscrive a tutti gli osservabili necessari
   */
  public ngOnInit(): void{
    this.textField = document.querySelector("input");
    this.subscriptions.push(this.searchHandler.getIsSearching(false).subscribe((value: boolean) => {
      let genre: string = this.searchHandler.getCurrentGenre(true);
      let list: GameListType = this.searchHandler.getCurrentList(true);
      this.currentName = genre || list ? "" : this.searchHandler.getCurrentName(true);
    }));
  }

  /***
   * Elimina tutte le iscrizioni
   */
  public ngOnDestroy() {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  /***
   * Gestice eventi dell'utente
   * @param event Il tipo di evento
   */
  public handleInput(event: any): void{
    if(event.key == "Enter"){
      this.currentName = event.target.value;
      if(this.currentName)
           this.searchHandler.setCurrentName(this.currentName);
    }
  }

  /***
   * Gestisce il click dell'utente
   */
  public handleClick(): void{
    this.currentName = this.textField?.value;
    if(this.currentName){
      this.searchHandler.setCurrentName(this.currentName);
    }
  }
}
