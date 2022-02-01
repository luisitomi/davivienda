import { TestBed } from '@angular/core/testing';

import { CorreccionFiltrosService } from './correccion-filtros.service';

describe('CorreccionFiltrosService', () => {
  let service: CorreccionFiltrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreccionFiltrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
