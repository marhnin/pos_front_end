import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupCheckDetailComponent } from './topup-check-detail.component';

describe('TopupCheckDetailComponent', () => {
  let component: TopupCheckDetailComponent;
  let fixture: ComponentFixture<TopupCheckDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupCheckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupCheckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
