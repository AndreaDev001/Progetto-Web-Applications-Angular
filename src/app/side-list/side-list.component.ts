import {Component, Input, OnInit} from '@angular/core';
import {SideListType} from "../enum";
import {SideItem} from "../side-bar/side-bar.component";

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit{
  @Input() name?: string;
  @Input() listType?: SideListType;
  @Input() values?: SideItem[];
  constructor(){

  }
  ngOnInit(): void{

  }
}
