import { TestBed } from '@angular/core/testing';

import { FiltrosServerInterceptor } from './filtros-server.interceptor';

describe('FiltrosServerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FiltrosServerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FiltrosServerInterceptor = TestBed.inject(FiltrosServerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
