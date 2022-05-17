import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Version129PointUserListComponent } from './version129-point-user-list.component';

describe('Version129PointUserListComponent', () => {
  let component: Version129PointUserListComponent;
  let fixture: ComponentFixture<Version129PointUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Version129PointUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Version129PointUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
