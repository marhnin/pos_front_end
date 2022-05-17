import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Version129ConfirmedPointUserListComponent } from './version129-confirmed-point-user-list.component';

describe('Version129ConfirmedPointUserListComponent', () => {
  let component: Version129ConfirmedPointUserListComponent;
  let fixture: ComponentFixture<Version129ConfirmedPointUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Version129ConfirmedPointUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Version129ConfirmedPointUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
