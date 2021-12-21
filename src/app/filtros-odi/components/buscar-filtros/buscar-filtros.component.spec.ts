import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFiltrosComponent } from './buscar-filtros.component';

describe('BuscarFiltrosComponent', () => {
  let component: BuscarFiltrosComponent;
  let fixture: ComponentFixture<BuscarFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
