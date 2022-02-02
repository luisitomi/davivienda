import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReprocesoService } from './reproceso.service';

describe('ReprocesoService', () => {
  let service: ReprocesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(ReprocesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
