import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSGameComponent } from './gs-game.component';

describe('GSGameComponent', () => {
  let component: GSGameComponent;
  let fixture: ComponentFixture<GSGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
