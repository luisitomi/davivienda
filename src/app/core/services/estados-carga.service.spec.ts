import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EstadosCargaService } from './estados-carga.service';

describe('EstadosCargaService', () => {
  let service: EstadosCargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(EstadosCargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
