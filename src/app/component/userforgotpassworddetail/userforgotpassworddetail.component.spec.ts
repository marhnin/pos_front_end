import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserforgotpassworddetailComponent } from './userforgotpassworddetail.component';

describe('UserforgotpassworddetailComponent', () => {
  let component: UserforgotpassworddetailComponent;
  let fixture: ComponentFixture<UserforgotpassworddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserforgotpassworddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserforgotpassworddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
