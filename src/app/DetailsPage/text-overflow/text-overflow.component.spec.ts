import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOverflowComponent } from './text-overflow.component';

describe('TextOverflowComponent', () => {
  let component: TextOverflowComponent;
  let fixture: ComponentFixture<TextOverflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextOverflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextOverflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
