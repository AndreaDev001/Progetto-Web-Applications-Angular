import {Component, Input, OnInit} from '@angular/core';
import {faStar,faStarHalfStroke, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-star-component',
  templateUrl: './star-component.component.html',
  styleUrls: ['./star-component.component.css']
})
export class StarComponentComponent implements OnInit{
  @Input() rating?: number;
  public fullStars: IconDefinition[] = [];
  public halfStars: IconDefinition[] = [];
  constructor() {
  }
  ngOnInit(): void{
    this.calculateStars();
  }
  public calculateStars(): number{
    let result: number = 0;
    if(this.rating != undefined){
      let value: String = String(this.rating / 20);
      let splitted: string[] = value.split('.');
      let fullAmount: number = Number(splitted[0]);
      for(let i = 0;i < fullAmount;i++)
         this.fullStars.push(faStar);
      if(splitted.length == 2){
        if(splitted[1].length >= 2 && Number(splitted[1]) >= 50 || splitted[1].length == 1 && Number(splitted[1]) >= 5)
          this.halfStars.push(faStarHalfStroke);
      }
    }
    return result;
  }
}
