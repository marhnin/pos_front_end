import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamBookAddNewComponent } from './dream-book-addnew.component';

describe('DreamBookAddNewComponent', () => {
  let component: DreamBookAddNewComponent;
  let fixture: ComponentFixture<DreamBookAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamBookAddNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamBookAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
