import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalBankAccReportComponent } from './withdrawalbankacc-report.component';

describe('TwoReportComponent', () => {
  let component: WithdrawalBankAccReportComponent;
  let fixture: ComponentFixture<WithdrawalBankAccReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalBankAccReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalBankAccReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
