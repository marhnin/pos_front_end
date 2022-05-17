import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodDetailComponent } from './twod-detail.component';

describe('TwodDetailComponent', () => {
  let component: TwodDetailComponent;
  let fixture: ComponentFixture<TwodDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
