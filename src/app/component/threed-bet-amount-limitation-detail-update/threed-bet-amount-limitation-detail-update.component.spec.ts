import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedBetAmountLimitationDetailUpdateComponent } from './threed-bet-amount-limitation-detail-update.component';

describe('ThreedBetAmountLimitationDetailUpdateComponent', () => {
  let component: ThreedBetAmountLimitationDetailUpdateComponent;
  let fixture: ComponentFixture<ThreedBetAmountLimitationDetailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedBetAmountLimitationDetailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBetAmountLimitationDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
