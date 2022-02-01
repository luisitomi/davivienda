import { TestBed } from '@angular/core/testing';

import { CombinacionContableService } from './combinacion-contable.service';

describe('CombinacionContableService', () => {
  let service: CombinacionContableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinacionContableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
