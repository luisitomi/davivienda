import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AsientosPendientesComponent } from './asientos-pendientes.component';

describe('AsientosPendientesComponent', () => {
  let component: AsientosPendientesComponent;
  let fixture: ComponentFixture<AsientosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsientosPendientesComponent ],
      imports: [ HttpClientModule, MatSnackBarModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
