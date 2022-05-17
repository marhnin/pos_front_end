import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OddEntryComponent } from './oddentry.component';
describe('OddEntryComponent', () => {
  let component: OddEntryComponent;
  let fixture: ComponentFixture<OddEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OddEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
