import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosSalidaComponent } from './filtros-salida.component';

describe('FiltrosSalidaComponent', () => {
  let component: FiltrosSalidaComponent;
  let fixture: ComponentFixture<FiltrosSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
