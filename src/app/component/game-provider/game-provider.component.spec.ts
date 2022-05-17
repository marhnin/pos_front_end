import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSGameProviderComponent } from './game-provider.component';

describe('GSGameProviderComponent', () => {
  let component: GSGameProviderComponent;
  let fixture: ComponentFixture<GSGameProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSGameProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSGameProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
