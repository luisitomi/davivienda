import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosCargaComponent } from './filtros-carga.component';

describe('FiltrosCargaComponent', () => {
  let component: FiltrosCargaComponent;
  let fixture: ComponentFixture<FiltrosCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
