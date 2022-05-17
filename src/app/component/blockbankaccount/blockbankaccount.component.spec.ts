import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockBankAccountComponent } from './blockbankaccount.component';
describe('BlockBankAccountComponent', () => {
  let component: BlockBankAccountComponent;
  let fixture: ComponentFixture<BlockBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
