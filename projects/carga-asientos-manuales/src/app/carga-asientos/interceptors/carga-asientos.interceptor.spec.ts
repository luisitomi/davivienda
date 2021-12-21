import { TestBed } from '@angular/core/testing';

import { CargaAsientosInterceptor } from './carga-asientos.interceptor';

describe('CargaAsientosInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CargaAsientosInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CargaAsientosInterceptor = TestBed.inject(CargaAsientosInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
