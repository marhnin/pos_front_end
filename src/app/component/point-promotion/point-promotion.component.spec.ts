import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPromotionComponent } from './point-promotion.component';

describe('PointPromotionComponent', () => {
  let component: PointPromotionComponent;
  let fixture: ComponentFixture<PointPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
