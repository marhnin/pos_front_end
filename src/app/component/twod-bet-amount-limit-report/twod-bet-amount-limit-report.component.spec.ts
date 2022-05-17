import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoBetLimitReportComponent } from './twod-bet-amount-limit-report.component';

describe('TwoBetLimitReportComponent', () => {
  let component: TwoBetLimitReportComponent;
  let fixture: ComponentFixture<TwoBetLimitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoBetLimitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoBetLimitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
