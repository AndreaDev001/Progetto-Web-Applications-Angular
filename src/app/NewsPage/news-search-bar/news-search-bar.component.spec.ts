import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsSearchBarComponent} from './news-search-bar.component';

describe('NewsSearchBarComponent', () => {
  let component: NewsSearchBarComponent;
  let fixture: ComponentFixture<NewsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
