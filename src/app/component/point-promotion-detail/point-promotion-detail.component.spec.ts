import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPromotionDetailComponent } from './point-promotion-detail.component';

describe('PointPromotionDetailComponent', () => {
  let component: PointPromotionDetailComponent;
  let fixture: ComponentFixture<PointPromotionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPromotionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPromotionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
