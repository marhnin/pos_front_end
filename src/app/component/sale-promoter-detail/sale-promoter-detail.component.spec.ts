import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePromoterDetailComponent } from './sale-promoter-detail.component';

describe('SalePromoterDetailComponent', () => {
  let component: SalePromoterDetailComponent;
  let fixture: ComponentFixture<SalePromoterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePromoterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePromoterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
