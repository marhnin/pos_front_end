import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHolderReportComponent } from './handle-amount-report.component';

describe('TwoReportComponent', () => {
  let component: AccountHolderReportComponent;
  let fixture: ComponentFixture<AccountHolderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountHolderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHolderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
