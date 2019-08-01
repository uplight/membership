import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipOrderComponent } from './membership-order.component';

describe('MembershipOrderComponent', () => {
  let component: MembershipOrderComponent;
  let fixture: ComponentFixture<MembershipOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
