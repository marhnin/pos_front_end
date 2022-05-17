import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTopupReportComponent } from './firsttopup-report.component';

describe('FirstTopupReportComponent', () => {
  let component: FirstTopupReportComponent;
  let fixture: ComponentFixture<FirstTopupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTopupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTopupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
