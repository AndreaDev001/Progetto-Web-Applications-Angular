import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarComponentComponent } from './star-component.component';

describe('StarComponentComponent', () => {
  let component: StarComponentComponent;
  let fixture: ComponentFixture<StarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
