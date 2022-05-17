import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedResultConfigurationDetailComponent } from './threed-result-configuration-detail.component';

describe('ThreedResultConfigurationDetailComponent', () => {
  let component: ThreedResultConfigurationDetailComponent;
  let fixture: ComponentFixture<ThreedResultConfigurationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedResultConfigurationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedResultConfigurationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
