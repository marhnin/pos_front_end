import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAdsDetailComponent } from './promotion-ads-detail.component';

describe('PromotionAdsDetailComponent', () => {
  let component: PromotionAdsDetailComponent;
  let fixture: ComponentFixture<PromotionAdsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionAdsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionAdsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
