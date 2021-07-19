import { TestBed } from '@angular/core/testing';

import { SincronizacionesService } from './sincronizaciones.service';

describe('SincronizacionesService', () => {
  let service: SincronizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SincronizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
