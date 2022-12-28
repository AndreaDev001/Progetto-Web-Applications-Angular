import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-details-media',
  templateUrl: './game-details-media.component.html',
  styleUrls: ['./game-details-media.component.css']
})
export class GameDetailsMediaComponent implements OnInit{
  @Input() name?: string;
  @Input() images?: string[];
  @Input() trailers?: string[];
  constructor() {
  }
  public ngOnInit() {
  }
}
