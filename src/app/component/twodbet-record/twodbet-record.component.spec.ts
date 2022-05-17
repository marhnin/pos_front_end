import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodbetRecordComponent } from './twodbet-record.component';

describe('TwodbetRecordComponent', () => {
  let component: TwodbetRecordComponent;
  let fixture: ComponentFixture<TwodbetRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodbetRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodbetRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
