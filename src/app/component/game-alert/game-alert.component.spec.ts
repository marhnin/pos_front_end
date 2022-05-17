import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSGameAlertProviderComponent } from './game-alert.component';

describe('GSGameAlertProviderComponent', () => {
  let component: GSGameAlertProviderComponent;
  let fixture: ComponentFixture<GSGameAlertProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSGameAlertProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSGameAlertProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
