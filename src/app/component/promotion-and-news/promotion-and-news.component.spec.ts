import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAndNewsComponent } from './promotion-and-news.component';

describe('PromotionAndNewsComponent', () => {
  let component: PromotionAndNewsComponent;
  let fixture: ComponentFixture<PromotionAndNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionAndNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionAndNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
