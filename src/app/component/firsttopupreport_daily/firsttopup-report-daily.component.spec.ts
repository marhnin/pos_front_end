import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTopupReportDailyComponent } from './firsttopup-report-daily.component';

describe('FirstTopupReportComponent', () => {
  let component: FirstTopupReportDailyComponent;
  let fixture: ComponentFixture<FirstTopupReportDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTopupReportDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTopupReportDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
