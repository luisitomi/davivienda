import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AsientosService } from './asientos.service';

describe('AsientosService', () => {
  let service: AsientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(AsientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
