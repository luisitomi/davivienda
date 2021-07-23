import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AsientoManualService } from './asiento-manual.service';

describe('AsientoManualService', () => {
  let service: AsientoManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(AsientoManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
