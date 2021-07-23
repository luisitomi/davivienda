import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EstadoAsientoService } from './estado-asiento.service';

describe('EstadoAsientoService', () => {
  let service: EstadoAsientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(EstadoAsientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
