import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWithdrawCheckComponent } from './withdraw-check-list.component';

describe('AgentWithdrawCheckComponent', () => {
  let component: AgentWithdrawCheckComponent;
  let fixture: ComponentFixture<AgentWithdrawCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentWithdrawCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWithdrawCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
