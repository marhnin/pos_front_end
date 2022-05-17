import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDDetailReportComponent } from './twoddetailreport.component';

describe('TwoDDetailReportComponent', () => {
  let component: TwoDDetailReportComponent;
  let fixture: ComponentFixture<TwoDDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
