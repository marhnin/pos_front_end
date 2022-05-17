import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePromoterComponent } from './sale-promoter.component';

describe('SalePromoterComponent', () => {
  let component: SalePromoterComponent;
  let fixture: ComponentFixture<SalePromoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePromoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
