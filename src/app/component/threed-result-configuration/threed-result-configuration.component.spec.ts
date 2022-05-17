import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedResultConfigurationComponent } from './threed-result-configuration.component';

describe('ThreedResultConfigurationComponent', () => {
  let component: ThreedResultConfigurationComponent;
  let fixture: ComponentFixture<ThreedResultConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedResultConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedResultConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
