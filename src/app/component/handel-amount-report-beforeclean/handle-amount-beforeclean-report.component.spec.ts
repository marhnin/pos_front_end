import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHolderBeforeCleanReportComponent } from './handle-amount-beforeclean-report.component';

describe('TwoReportComponent', () => {
  let component: AccountHolderBeforeCleanReportComponent;
  let fixture: ComponentFixture<AccountHolderBeforeCleanReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountHolderBeforeCleanReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHolderBeforeCleanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
