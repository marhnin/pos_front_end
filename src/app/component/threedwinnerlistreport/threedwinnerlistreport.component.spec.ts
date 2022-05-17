import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedWinnerListReportComponent } from './threedwinnerlistreport.component';

describe('ThreedWinnerListReportComponent', () => {
  let component: ThreedWinnerListReportComponent;
  let fixture: ComponentFixture<ThreedWinnerListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedWinnerListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedWinnerListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
