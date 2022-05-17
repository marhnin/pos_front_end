import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeDetailComponent } from './marquee-component.component';

describe('MarqueeDetailComponent', () => {
  let component: MarqueeDetailComponent;
  let fixture: ComponentFixture<MarqueeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
