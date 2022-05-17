import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAndNewsDetailComponent } from './promotion-and-news-detail.component';

describe('PromotionAndNewsDetailComponent', () => {
  let component: PromotionAndNewsDetailComponent;
  let fixture: ComponentFixture<PromotionAndNewsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionAndNewsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionAndNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
