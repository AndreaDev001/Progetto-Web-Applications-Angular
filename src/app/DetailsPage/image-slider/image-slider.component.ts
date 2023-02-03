import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit{

  @Input() name?: string;
  @Input() images: string[] = [];
  public currentIndex: number = 0;
  constructor() {
  }
  public ngOnInit(): void{

  }
}
