import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwodLiveResultComponent } from './twod-live-result.component';

describe('TwodLiveResultComponent', () => {
  let component: TwodLiveResultComponent;
  let fixture: ComponentFixture<TwodLiveResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwodLiveResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwodLiveResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
