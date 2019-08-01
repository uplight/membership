import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStepComponent } from './address-step.component';

describe('AddressStepComponent', () => {
  let component: AddressStepComponent;
  let fixture: ComponentFixture<AddressStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
