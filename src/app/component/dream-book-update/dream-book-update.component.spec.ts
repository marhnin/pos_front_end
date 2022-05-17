import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamBookUpdateComponent } from './dream-book-update.component';

describe('DreamBookUpdateComponent', () => {
  let component: DreamBookUpdateComponent;
  let fixture: ComponentFixture<DreamBookUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamBookUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamBookUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
