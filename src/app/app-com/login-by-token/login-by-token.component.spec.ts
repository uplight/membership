import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginByTokenComponent } from './login-by-token.component';

describe('LoginByTokenComponent', () => {
  let component: LoginByTokenComponent;
  let fixture: ComponentFixture<LoginByTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginByTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginByTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
