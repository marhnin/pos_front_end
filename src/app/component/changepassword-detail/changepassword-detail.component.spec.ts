import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordDetailComponent } from './changepassword-detail.component';

describe('ChangepasswordDetailComponent', () => {
  let component: ChangepasswordDetailComponent;
  let fixture: ComponentFixture<ChangepasswordDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepasswordDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
