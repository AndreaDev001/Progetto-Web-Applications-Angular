import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-additional-info',
  templateUrl: './game-additional-info.component.html',
  styleUrls: ['./game-additional-info.component.css']
})
export class GameAdditionalInfoComponent implements OnInit{
  @Input() developers?: string[];
  @Input() publishers?: string[];
  @Input() tags?: string[];

  constructor() {
  }
  public ngOnInit(): void{

  }
}
