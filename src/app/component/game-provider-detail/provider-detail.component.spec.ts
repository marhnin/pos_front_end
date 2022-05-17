import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameProviderDetailComponent } from './provider-detail.component';

describe('GameProviderDetailComponent', () => {
  let component: GameProviderDetailComponent;
  let fixture: ComponentFixture<GameProviderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameProviderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
