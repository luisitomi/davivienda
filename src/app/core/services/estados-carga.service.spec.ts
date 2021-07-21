import { TestBed } from '@angular/core/testing';

import { EstadosCargaService } from './estados-carga.service';

describe('EstadosCargaService', () => {
  let service: EstadosCargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosCargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
