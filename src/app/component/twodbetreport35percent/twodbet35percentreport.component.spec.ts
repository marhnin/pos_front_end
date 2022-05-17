import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twod35PercentReportComponent } from './twodbet35percentreport.component';

describe('Twod35PercentReportComponent', () => {
  let component: Twod35PercentReportComponent;
  let fixture: ComponentFixture<Twod35PercentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twod35PercentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twod35PercentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
