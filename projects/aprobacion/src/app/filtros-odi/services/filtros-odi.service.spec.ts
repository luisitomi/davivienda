import { TestBed } from '@angular/core/testing';

import { FiltrosOdiService } from './filtros-odi.service';

describe('FiltrosOdiService', () => {
  let service: FiltrosOdiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrosOdiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
