import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockBankAccountDetailComponent } from './blockbankaccount-detail.component';

describe('BlockBankAccountDetailComponent', () => {
  let component: BlockBankAccountDetailComponent;
  let fixture: ComponentFixture<BlockBankAccountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockBankAccountDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBankAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
