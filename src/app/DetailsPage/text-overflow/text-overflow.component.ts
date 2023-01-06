import {Component, Input, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";


export interface overflowItem{
  name: string,
  image?: string,
  icon?: IconDefinition;
}
@Component({
  selector: 'app-text-overflow',
  templateUrl: './text-overflow.component.html',
  styleUrls: ['./text-overflow.component.css']
})
export class TextOverflowComponent implements OnInit{
  @Input() nameIcon?: IconDefinition;
  @Input() nameImage?: string;
  @Input() name?: string;
  @Input() overflowItems?: overflowItem[];

  constructor() {
  }
  public ngOnInit(): void{

  }
}
