import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedDetailComponent } from './threed-detail.component';

describe('ThreedDetailComponent', () => {
  let component: ThreedDetailComponent;
  let fixture: ComponentFixture<ThreedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
