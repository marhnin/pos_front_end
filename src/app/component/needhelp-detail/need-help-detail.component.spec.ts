import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedHelpDetailComponent } from './need-help-detail.component';

describe('GameAlertDetailComponent', () => {
  let component: NeedHelpDetailComponent;
  let fixture: ComponentFixture<NeedHelpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedHelpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedHelpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
