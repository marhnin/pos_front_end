import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionConfirmedUsersComponent } from './promotion-confirmed-users.component';

describe('PromotionConfirmedUsersComponent', () => {
  let component: PromotionConfirmedUsersComponent;
  let fixture: ComponentFixture<PromotionConfirmedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionConfirmedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionConfirmedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
