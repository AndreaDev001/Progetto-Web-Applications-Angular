import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingFilterComponent } from './sorting-filter.component';

describe('SortingFilterComponent', () => {
  let component: SortingFilterComponent;
  let fixture: ComponentFixture<SortingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
