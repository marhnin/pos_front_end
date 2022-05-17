import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodBetAmountLimitationComponent } from './twod-bet-amount-limitation.component';

describe('TwodBetAmountLimitationComponent', () => {
  let component: TwodBetAmountLimitationComponent;
  let fixture: ComponentFixture<TwodBetAmountLimitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodBetAmountLimitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodBetAmountLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
