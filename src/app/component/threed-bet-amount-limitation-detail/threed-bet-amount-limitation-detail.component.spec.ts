import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedBetAmountLimitationDetailComponent } from './threed-bet-amount-limitation-detail.component';

describe('ThreedBetAmountLimitationDetailComponent', () => {
  let component: ThreedBetAmountLimitationDetailComponent;
  let fixture: ComponentFixture<ThreedBetAmountLimitationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedBetAmountLimitationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBetAmountLimitationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
