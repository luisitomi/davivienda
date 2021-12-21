import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { FormularioCabeceraComponent } from './formulario-cabecera.component';

describe('FormularioCabeceraComponent', () => {
  let component: FormularioCabeceraComponent;
  let fixture: ComponentFixture<FormularioCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCabeceraComponent ],
      imports: [ HttpClientModule, MatSnackBarModule, RouterTestingModule ],
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
