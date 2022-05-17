import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirguationListComponent } from './thai2d3d-confirguation-list.component';
describe('ConfirguationListComponent', () => {
  let component: ConfirguationListComponent;
  let fixture: ComponentFixture<ConfirguationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirguationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirguationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
