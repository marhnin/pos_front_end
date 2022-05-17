import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPromotionUsersComponent } from './point-promotion-users.component';

describe('PointPromotionUsersComponent', () => {
  let component: PointPromotionUsersComponent;
  let fixture: ComponentFixture<PointPromotionUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPromotionUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPromotionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
