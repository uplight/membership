import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormFieldsComponent } from './person-form-fields.component';

describe('PersonFormFielsComponent', () => {
  let component: PersonFormFieldsComponent;
  let fixture: ComponentFixture<PersonFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFormFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
