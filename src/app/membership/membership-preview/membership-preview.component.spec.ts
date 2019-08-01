import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPreviewComponent } from './membership-preview.component';

describe('MembershipPreviewComponent', () => {
  let component: MembershipPreviewComponent;
  let fixture: ComponentFixture<MembershipPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
