import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedbetRecordComponent } from './threedbet-record.component';

describe('ThreedbetRecordComponent', () => {
  let component: ThreedbetRecordComponent;
  let fixture: ComponentFixture<ThreedbetRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedbetRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedbetRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
