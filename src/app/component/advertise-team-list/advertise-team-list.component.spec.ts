import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseTeamListComponent } from './advertise-team-list.component';

describe('AdvertiseTeamListComponent', () => {
  let component: AdvertiseTeamListComponent;
  let fixture: ComponentFixture<AdvertiseTeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseTeamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
