import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupCheckComponent } from './topup-check.component';

describe('TopupCheckComponent', () => {
  let component: TopupCheckComponent;
  let fixture: ComponentFixture<TopupCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
