import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameMainInfoComponent} from './game-main-info.component';

describe('GameMainInfoComponent', () => {
  let component: GameMainInfoComponent;
  let fixture: ComponentFixture<GameMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMainInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
