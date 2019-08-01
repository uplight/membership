import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddressStepComponent } from './membership-address-step.component';

describe('MembershipAddressStepComponent', () => {
  let component: MembershipAddressStepComponent;
  let fixture: ComponentFixture<MembershipAddressStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipAddressStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipAddressStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
