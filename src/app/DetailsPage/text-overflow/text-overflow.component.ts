import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-overflow',
  templateUrl: './text-overflow.component.html',
  styleUrls: ['./text-overflow.component.css']
})
export class TextOverflowComponent implements OnInit{
  @Input() name?: string;
  @Input() values?: string[];
  constructor() {
  }
  public ngOnInit(): void{

  }
}
