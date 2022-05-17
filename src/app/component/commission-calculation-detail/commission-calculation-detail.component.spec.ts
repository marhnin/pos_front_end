import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionCalculationDetailComponent } from './commission-calculation-detail.component';

describe('CommissionCalculationDetailComponent', () => {
  let component: CommissionCalculationDetailComponent;
  let fixture: ComponentFixture<CommissionCalculationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionCalculationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionCalculationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
