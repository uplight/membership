import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAgreementComponent } from './person-agreement.component';

describe('PersonAgreementComponent', () => {
  let component: PersonAgreementComponent;
  let fixture: ComponentFixture<PersonAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
