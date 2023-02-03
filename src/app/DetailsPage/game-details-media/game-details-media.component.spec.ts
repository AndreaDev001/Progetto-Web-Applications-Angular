import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameDetailsMediaComponent} from './game-details-media.component';

describe('GameDetailsMediaComponent', () => {
  let component: GameDetailsMediaComponent;
  let fixture: ComponentFixture<GameDetailsMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
