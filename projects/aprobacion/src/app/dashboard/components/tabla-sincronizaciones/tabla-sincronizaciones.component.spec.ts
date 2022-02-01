import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSincronizacionesComponent } from './tabla-sincronizaciones.component';

describe('TablaSincronizacionesComponent', () => {
  let component: TablaSincronizacionesComponent;
  let fixture: ComponentFixture<TablaSincronizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSincronizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSincronizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
