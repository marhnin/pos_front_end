import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OddEntryDetailComponent } from './oddentry-detail.component';

describe('OddEntryDetailComponent', () => {
  let component: OddEntryDetailComponent;
  let fixture: ComponentFixture<OddEntryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddEntryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OddEntryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
