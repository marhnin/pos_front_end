import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatementsReportComponent } from './userstatementsreport.component';

describe('UserStatementsReportComponent', () => {
  let component: UserStatementsReportComponent;
  let fixture: ComponentFixture<UserStatementsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatementsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatementsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
