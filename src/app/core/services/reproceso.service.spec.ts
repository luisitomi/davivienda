import { TestBed } from '@angular/core/testing';

import { ReprocesoService } from './reproceso.service';

describe('ReprocesoService', () => {
  let service: ReprocesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReprocesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
