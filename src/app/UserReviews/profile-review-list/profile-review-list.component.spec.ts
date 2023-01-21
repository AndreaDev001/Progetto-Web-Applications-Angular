import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewListComponent } from './profile-review-list.component';

describe('ProfileReviewListComponent', () => {
  let component: ProfileReviewListComponent;
  let fixture: ComponentFixture<ProfileReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileReviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
