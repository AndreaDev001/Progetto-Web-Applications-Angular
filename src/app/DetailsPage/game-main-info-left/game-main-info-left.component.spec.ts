import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameMainInfoLeftComponent} from './game-main-info-left.component';

describe('GameMainInfoLeftComponent', () => {
  let component: GameMainInfoLeftComponent;
  let fixture: ComponentFixture<GameMainInfoLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMainInfoLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMainInfoLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
