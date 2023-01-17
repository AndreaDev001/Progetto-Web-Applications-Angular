import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAdditionalInfoComponent } from './game-additional-info.component';

describe('GameAdditionalInfoComponent', () => {
  let component: GameAdditionalInfoComponent;
  let fixture: ComponentFixture<GameAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAdditionalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
