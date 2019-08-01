import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSquadronsComponent } from './membership-squadrons.component';

describe('MembershipSquadronsComponent', () => {
  let component: MembershipSquadronsComponent;
  let fixture: ComponentFixture<MembershipSquadronsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipSquadronsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipSquadronsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
