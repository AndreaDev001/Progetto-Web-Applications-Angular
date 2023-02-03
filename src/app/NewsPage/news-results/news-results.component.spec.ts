import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsResultsComponent} from './news-results.component';

describe('NewsResultsComponent', () => {
  let component: NewsResultsComponent;
  let fixture: ComponentFixture<NewsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
