import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionConfirmedUsersDetailComponent } from './promotion-confirmed-users-detail.component';

describe('PromotionConfirmedUsersDetailComponent', () => {
  let component: PromotionConfirmedUsersDetailComponent;
  let fixture: ComponentFixture<PromotionConfirmedUsersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionConfirmedUsersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionConfirmedUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
