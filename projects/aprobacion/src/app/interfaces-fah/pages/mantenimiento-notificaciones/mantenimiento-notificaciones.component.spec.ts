import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoNotificacionesComponent } from './mantenimiento-notificaciones.component';

describe('MantenimientoNotificacionesComponent', () => {
  let component: MantenimientoNotificacionesComponent;
  let fixture: ComponentFixture<MantenimientoNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
