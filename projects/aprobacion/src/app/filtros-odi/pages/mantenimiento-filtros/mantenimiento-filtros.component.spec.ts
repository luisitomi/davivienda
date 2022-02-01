import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoFiltrosComponent } from './mantenimiento-filtros.component';

describe('MantenimientoFiltrosComponent', () => {
  let component: MantenimientoFiltrosComponent;
  let fixture: ComponentFixture<MantenimientoFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
