import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFeesComponent } from './membership-fees.component';

describe('MembershipFeesComponent', () => {
  let component: MembershipFeesComponent;
  let fixture: ComponentFixture<MembershipFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
