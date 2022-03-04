import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectFilterComponent } from './selectFilter.component';

describe('SelectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        SelectFilterComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SelectFilterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
