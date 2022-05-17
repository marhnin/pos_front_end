import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingTeamAddComponent } from './advertising-team-add.component';

describe('AdvertisingTeamAddComponent', () => {
  let component: AdvertisingTeamAddComponent;
  let fixture: ComponentFixture<AdvertisingTeamAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingTeamAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingTeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
