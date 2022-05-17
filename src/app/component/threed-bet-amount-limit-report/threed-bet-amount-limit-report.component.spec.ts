import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedBetLimitReportComponent } from './threed-bet-amount-limit-report.component';

describe('ThreedBetLimitReportComponent', () => {
  let component: ThreedBetLimitReportComponent;
  let fixture: ComponentFixture<ThreedBetLimitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedBetLimitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBetLimitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
