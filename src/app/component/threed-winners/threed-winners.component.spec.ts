import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedWinnersComponent } from './threed-winners.component';

describe('ThreedWinnersComponent', () => {
  let component: ThreedWinnersComponent;
  let fixture: ComponentFixture<ThreedWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
