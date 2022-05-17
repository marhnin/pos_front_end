import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerMonthlyReportComponent } from './winnerreport_monthly.component';

describe('WinnerMonthlyReportComponent', () => {
  let component: WinnerMonthlyReportComponent;
  let fixture: ComponentFixture<WinnerMonthlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerMonthlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
