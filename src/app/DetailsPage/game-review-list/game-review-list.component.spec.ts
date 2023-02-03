import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameReviewListComponent} from './game-review-list.component';

describe('GameReviewListComponent', () => {
  let component: GameReviewListComponent;
  let fixture: ComponentFixture<GameReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameReviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
