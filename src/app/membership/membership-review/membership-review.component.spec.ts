import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipReviewComponent } from './membership-review.component';

describe('MembershipReviewComponent', () => {
  let component: MembershipReviewComponent;
  let fixture: ComponentFixture<MembershipReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
