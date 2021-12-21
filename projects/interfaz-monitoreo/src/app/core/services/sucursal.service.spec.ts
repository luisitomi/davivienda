import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SucursalService } from './sucursal.service';

describe('SucursalService', () => {
  let service: SucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(SucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
