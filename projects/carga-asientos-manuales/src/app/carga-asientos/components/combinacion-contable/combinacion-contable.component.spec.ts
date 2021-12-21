import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinacionContableComponent } from './combinacion-contable.component';

describe('CombinacionContableComponent', () => {
  let component: CombinacionContableComponent;
  let fixture: ComponentFixture<CombinacionContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinacionContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinacionContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
