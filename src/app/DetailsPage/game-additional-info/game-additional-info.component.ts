import {Component, Input, OnInit} from '@angular/core';
import {overflowItem} from "../text-overflow/text-overflow.component";

@Component({
  selector: 'app-game-additional-info',
  templateUrl: './game-additional-info.component.html',
  styleUrls: ['./game-additional-info.component.css']
})
export class GameAdditionalInfoComponent implements OnInit{
  @Input() developers?: string[];
  @Input() publishers?: string[];
  @Input() tags?: string[];
  @Input() achievements?: string[];
  public isEmpty: boolean = false;

  constructor() {
  }

  /***
   * Verifica se il componente è vuoto o meno
   */
  public ngOnInit(): void{
    this.isEmpty = !this.developers && !this.publishers && !this.tags && !this.achievements;
  }

  /***
   * Crea i valori per i text overflow contenuti nell'html
   * @param values Stringhe da utilizzare negli items
   */
  public createItems(values: string[]): overflowItem[]{
    let result: overflowItem[] = [];
    for(let current of values)
      result.push({name: current});
    return result;
  }
}
