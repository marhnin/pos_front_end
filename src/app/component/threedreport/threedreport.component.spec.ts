import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDReportComponent } from './threedreport.component';

describe('ThreeDReportComponent', () => {
  let component: ThreeDReportComponent;
  let fixture: ComponentFixture<ThreeDReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
