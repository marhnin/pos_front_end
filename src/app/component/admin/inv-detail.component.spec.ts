import { async, ComponentFixture,TestBed } from '@angular/core/testing';
import { IndDetailComponent } from './inv-detail.component';

describe('IndDetailComponent', () => {
  let component: IndDetailComponent;
  let fixture: ComponentFixture<IndDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
