import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWithdrawCheckDetailComponent } from './agent-withdraw-check-detail.component';

describe('AgentWithdrawCheckDetailComponent', () => {
  let component: AgentWithdrawCheckDetailComponent;
  let fixture: ComponentFixture<AgentWithdrawCheckDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentWithdrawCheckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWithdrawCheckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
