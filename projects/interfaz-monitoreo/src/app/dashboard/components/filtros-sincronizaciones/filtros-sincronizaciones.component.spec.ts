import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosSincronizacionesComponent } from './filtros-sincronizaciones.component';

describe('FiltrosSincronizacionesComponent', () => {
  let component: FiltrosSincronizacionesComponent;
  let fixture: ComponentFixture<FiltrosSincronizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosSincronizacionesComponent ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosSincronizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
