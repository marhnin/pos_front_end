import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCheckDetailComponent } from './withdraw-check-detail.component';

describe('WithdrawCheckDetailComponent', () => {
  let component: WithdrawCheckDetailComponent;
  let fixture: ComponentFixture<WithdrawCheckDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawCheckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawCheckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
