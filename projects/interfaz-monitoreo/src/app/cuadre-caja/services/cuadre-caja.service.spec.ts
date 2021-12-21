import { TestBed } from '@angular/core/testing';

import { CuadreCajaService } from './cuadre-caja.service';

describe('CuadreCajaService', () => {
  let service: CuadreCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuadreCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
