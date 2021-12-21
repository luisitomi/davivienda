import { TestBed } from '@angular/core/testing';

import { ReceptoresService } from './receptores.service';

describe('ReceptoresService', () => {
  let service: ReceptoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
