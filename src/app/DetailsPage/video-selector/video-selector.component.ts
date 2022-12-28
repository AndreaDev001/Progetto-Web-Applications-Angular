import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-selector',
  templateUrl: './video-selector.component.html',
  styleUrls: ['./video-selector.component.css']
})
export class VideoSelectorComponent implements OnInit{
  @Input() source?: string;
  constructor() {
  }
  public ngOnInit() {
  }
}
