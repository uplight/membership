import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFinalComponent } from './membership-final.component';

describe('MembershipFinalComponent', () => {
  let component: MembershipFinalComponent;
  let fixture: ComponentFixture<MembershipFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
