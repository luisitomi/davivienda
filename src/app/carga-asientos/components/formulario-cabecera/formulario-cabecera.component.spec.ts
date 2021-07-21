import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCabeceraComponent } from './formulario-cabecera.component';

describe('FormularioCabeceraComponent', () => {
  let component: FormularioCabeceraComponent;
  let fixture: ComponentFixture<FormularioCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
