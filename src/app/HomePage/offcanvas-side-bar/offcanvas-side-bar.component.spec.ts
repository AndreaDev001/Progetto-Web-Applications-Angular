import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasSideBarComponent } from './offcanvas-side-bar.component';

describe('OffcanvasSideBarComponent', () => {
  let component: OffcanvasSideBarComponent;
  let fixture: ComponentFixture<OffcanvasSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
