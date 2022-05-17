import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedBetAmountLimitationComponent } from './threed-bet-amount-limitation.component';

describe('ThreedBetAmountLimitationComponent', () => {
  let component: ThreedBetAmountLimitationComponent;
  let fixture: ComponentFixture<ThreedBetAmountLimitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedBetAmountLimitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBetAmountLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
