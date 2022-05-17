import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPromotionUserDetilsComponent } from './point-promotion-user-detils.component';

describe('PointPromotionUserDetilsComponent', () => {
  let component: PointPromotionUserDetilsComponent;
  let fixture: ComponentFixture<PointPromotionUserDetilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPromotionUserDetilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPromotionUserDetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
