import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputCurrencyComponent } from './input-currency.component';

describe('InputCurrencyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        InputCurrencyComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InputCurrencyComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
