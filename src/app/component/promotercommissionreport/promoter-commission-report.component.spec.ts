import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterCommissionReportComponent } from './promoter-commission-report.component';

describe('PromoterCommissionReportComponent', () => {
  let component: PromoterCommissionReportComponent;
  let fixture: ComponentFixture<PromoterCommissionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoterCommissionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterCommissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
