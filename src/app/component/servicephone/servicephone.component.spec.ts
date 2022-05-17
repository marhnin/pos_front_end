import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicephoneComponent } from './servicephone.component';

describe('ServicephoneComponent', () => {
  let component: ServicephoneComponent;
  let fixture: ComponentFixture<ServicephoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicephoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
