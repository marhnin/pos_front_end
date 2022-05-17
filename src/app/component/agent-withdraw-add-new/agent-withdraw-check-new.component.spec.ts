import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWithdrawAddNewComponent } from './agent-withdraw-check-new.component';

describe('AgentWithdrawAddNewComponent', () => {
  let component: AgentWithdrawAddNewComponent;
  let fixture: ComponentFixture<AgentWithdrawAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentWithdrawAddNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWithdrawAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
