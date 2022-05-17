import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWCGameDetailComponent } from './awc-game-detail.component';

describe('AWCGameDetailComponent', () => {
  let component: AWCGameDetailComponent;
  let fixture: ComponentFixture<AWCGameDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWCGameDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWCGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
