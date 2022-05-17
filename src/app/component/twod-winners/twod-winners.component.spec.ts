import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodWinnersComponent } from './twod-winners.component';

describe('TwodWinnersComponent', () => {
  let component: TwodWinnersComponent;
  let fixture: ComponentFixture<TwodWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
