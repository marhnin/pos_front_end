import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodWinnerListReportComponent } from './twodwinnerlistreport.component';

describe('TwodWinnerListReportComponent', () => {
  let component: TwodWinnerListReportComponent;
  let fixture: ComponentFixture<TwodWinnerListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodWinnerListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodWinnerListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
