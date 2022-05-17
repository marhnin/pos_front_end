import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAdsComponent } from './promotion-ads.component';

describe('PromotionAdsComponent', () => {
  let component: PromotionAdsComponent;
  let fixture: ComponentFixture<PromotionAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
