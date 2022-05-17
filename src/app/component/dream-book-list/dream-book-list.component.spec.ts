import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamBookListComponent } from './dream-book-list.component';

describe('DreamBookListComponent', () => {
  let component: DreamBookListComponent;
  let fixture: ComponentFixture<DreamBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
