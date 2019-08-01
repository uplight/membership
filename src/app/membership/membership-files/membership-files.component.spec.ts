import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFilesComponent } from './membership-files.component';

describe('MembershipFilesComponent', () => {
  let component: MembershipFilesComponent;
  let fixture: ComponentFixture<MembershipFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
