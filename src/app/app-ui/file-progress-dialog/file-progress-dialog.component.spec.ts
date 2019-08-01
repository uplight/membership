import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileProgressDialogComponent } from './file-progress-dialog.component';

describe('FileProgressDialogComponent', () => {
  let component: FileProgressDialogComponent;
  let fixture: ComponentFixture<FileProgressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileProgressDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
