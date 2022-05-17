import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSDetailGameComponent } from './gs-game-detail.component';

describe('GSDetailGameComponent', () => {
  let component: GSDetailGameComponent;
  let fixture: ComponentFixture<GSDetailGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSDetailGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSDetailGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
