import { TestBed } from '@angular/core/testing';

import { CuadreServerInterceptor } from './cuadre-server.interceptor';

describe('CuadreServerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CuadreServerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CuadreServerInterceptor = TestBed.inject(CuadreServerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
