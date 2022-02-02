import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaFiltrosComponent } from './carga-filtros.component';

describe('CargaFiltrosComponent', () => {
  let component: CargaFiltrosComponent;
  let fixture: ComponentFixture<CargaFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
