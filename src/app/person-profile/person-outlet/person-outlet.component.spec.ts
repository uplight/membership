import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOutletComponent } from './person-outlet.component';

describe('PersonOutletComponent', () => {
  let component: PersonOutletComponent;
  let fixture: ComponentFixture<PersonOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
