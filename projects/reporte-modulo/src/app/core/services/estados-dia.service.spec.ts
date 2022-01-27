import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EstadosDiaService } from './estados-dia.service';

describe('EstadosDiaService', () => {
  let service: EstadosDiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(EstadosDiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
