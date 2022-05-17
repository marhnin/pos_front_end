import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConfrimComponent } from './commission-comfirmation.component';

describe('CommissionConfrimComponent', () => {
  let component: CommissionConfrimComponent;
  let fixture: ComponentFixture<CommissionConfrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConfrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConfrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
