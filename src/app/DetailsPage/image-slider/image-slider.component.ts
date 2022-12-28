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
  public updateIndex(increase: boolean){
    this.currentIndex = increase ? this.currentIndex + 1 : this.currentIndex - 1;
    this.currentIndex = this.currentIndex < 0 ? this.images.length - 1 : this.currentIndex;
    this.currentIndex = this.currentIndex >= this.images.length ? 0 : this.currentIndex;
  }
}
