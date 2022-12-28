import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSelectorComponent } from './video-selector.component';

describe('VideoSelectorComponent', () => {
  let component: VideoSelectorComponent;
  let fixture: ComponentFixture<VideoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
