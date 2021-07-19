import { TestBed } from '@angular/core/testing';

import { CorreccionColumnasService } from './correccion-columnas.service';

describe('CorreccionColumnasService', () => {
  let service: CorreccionColumnasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreccionColumnasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
