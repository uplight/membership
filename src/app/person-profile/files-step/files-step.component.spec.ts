import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesStepComponent } from './files-step.component';

describe('FilesStepComponent', () => {
  let component: FilesStepComponent;
  let fixture: ComponentFixture<FilesStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
