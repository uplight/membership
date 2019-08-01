import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFilesComponent } from './person-files.component';

describe('PersonFilesComponent', () => {
  let component: PersonFilesComponent;
  let fixture: ComponentFixture<PersonFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
