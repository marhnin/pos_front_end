import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCheckComponent } from './withdraw-check.component';

describe('WithdrawCheckComponent', () => {
  let component: WithdrawCheckComponent;
  let fixture: ComponentFixture<WithdrawCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
