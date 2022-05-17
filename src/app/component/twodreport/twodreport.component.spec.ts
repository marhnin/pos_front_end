import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoReportComponent } from './twodreport.component';

describe('TwoReportComponent', () => {
  let component: TwoReportComponent;
  let fixture: ComponentFixture<TwoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
