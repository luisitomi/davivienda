import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorregirConfirmacionComponent } from './corregir-confirmacion.component';

describe('CorregirConfirmacionComponent', () => {
  let component: CorregirConfirmacionComponent;
  let fixture: ComponentFixture<CorregirConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorregirConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorregirConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
