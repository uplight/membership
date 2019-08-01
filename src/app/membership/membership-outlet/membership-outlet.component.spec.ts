import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipOutletComponent } from './membership-outlet.component';

describe('MembershipOutletComponent', () => {
  let component: MembershipOutletComponent;
  let fixture: ComponentFixture<MembershipOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
