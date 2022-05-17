import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicephoneDetailComponent } from './servicephone-detail.component';

describe('ServicephoneDetailComponent', () => {
  let component: ServicephoneDetailComponent;
  let fixture: ComponentFixture<ServicephoneDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicephoneDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicephoneDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
