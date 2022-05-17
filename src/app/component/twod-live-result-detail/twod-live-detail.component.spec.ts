import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodLiveDetailComponent } from './twod-live-detail.component';

describe('TwodLiveDetailComponent', () => {
  let component: TwodLiveDetailComponent;
  let fixture: ComponentFixture<TwodLiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodLiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodLiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
