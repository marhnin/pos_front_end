import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserforgotpasswordComponent } from './userforgotpassword.component';

describe('UserforgotpasswordComponent', () => {
  let component: UserforgotpasswordComponent;
  let fixture: ComponentFixture<UserforgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserforgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
