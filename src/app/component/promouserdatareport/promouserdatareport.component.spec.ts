import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromouserdatareportComponent } from './promouserdatareport.component';

describe('PromouserdatareportComponent', () => {
  let component: PromouserdatareportComponent;
  let fixture: ComponentFixture<PromouserdatareportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromouserdatareportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromouserdatareportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
