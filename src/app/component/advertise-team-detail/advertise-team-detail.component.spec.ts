import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseTeamDetailComponent } from './advertise-team-detail.component';

describe('AdvertiseTeamDetailComponent', () => {
  let component: AdvertiseTeamDetailComponent;
  let fixture: ComponentFixture<AdvertiseTeamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseTeamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
