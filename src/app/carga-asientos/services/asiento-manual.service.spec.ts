import { TestBed } from '@angular/core/testing';

import { AsientoManualService } from './asiento-manual.service';

describe('AsientoManualService', () => {
  let service: AsientoManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientoManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
