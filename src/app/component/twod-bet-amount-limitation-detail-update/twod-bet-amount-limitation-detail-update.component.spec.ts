import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodBetAmountLimitationDetailComponent } from './twod-bet-amount-limitation-detail-update.component';

describe('TwodBetAmountLimitationDetailComponent', () => {
  let component: TwodBetAmountLimitationDetailComponent;
  let fixture: ComponentFixture<TwodBetAmountLimitationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodBetAmountLimitationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodBetAmountLimitationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
