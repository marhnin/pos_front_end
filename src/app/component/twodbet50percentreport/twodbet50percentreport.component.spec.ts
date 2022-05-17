import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twod50PercentReportComponent } from './twodbet50percentreport.component';

describe('Twod50PercentReportComponent', () => {
  let component: Twod50PercentReportComponent;
  let fixture: ComponentFixture<Twod50PercentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twod50PercentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twod50PercentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
