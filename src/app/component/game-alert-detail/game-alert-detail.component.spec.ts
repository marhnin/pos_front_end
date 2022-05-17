import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAlertDetailComponent } from './game-alert-detail.component';

describe('GameAlertDetailComponent', () => {
  let component: GameAlertDetailComponent;
  let fixture: ComponentFixture<GameAlertDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAlertDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAlertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
