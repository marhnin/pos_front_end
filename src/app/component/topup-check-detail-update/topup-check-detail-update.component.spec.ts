import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupCheckDetailUpdateComponent } from './topup-check-detail-update.component';

describe('TopupCheckDetailUpdateComponent', () => {
  let component: TopupCheckDetailUpdateComponent;
  let fixture: ComponentFixture<TopupCheckDetailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupCheckDetailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupCheckDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
