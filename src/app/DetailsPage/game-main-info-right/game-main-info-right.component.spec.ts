import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameMainInfoRightComponent} from './game-main-info-right.component';

describe('GameMainInfoRightComponent', () => {
  let component: GameMainInfoRightComponent;
  let fixture: ComponentFixture<GameMainInfoRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMainInfoRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMainInfoRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
