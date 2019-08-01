import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPersonalComponent } from './membership-personal.component';

describe('MembershipIndividualComponent', () => {
  let component: MembershipPersonalComponent;
  let fixture: ComponentFixture<MembershipPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
