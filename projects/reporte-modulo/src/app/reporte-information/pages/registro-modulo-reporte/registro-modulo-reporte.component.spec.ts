import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroModuloReporteComponent } from './registro-modulo-reporte.component';

describe('TablaLimitesComponent', () => {
  let component: RegistroModuloReporteComponent;
  let fixture: ComponentFixture<RegistroModuloReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroModuloReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroModuloReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
