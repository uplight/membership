import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFamilyComponent } from './membership-family.component';

describe('MembershipFamilyComponent', () => {
  let component: MembershipFamilyComponent;
  let fixture: ComponentFixture<MembershipFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
