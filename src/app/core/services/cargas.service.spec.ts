import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CargasService } from './cargas.service';

describe('CargasService', () => {
  let service: CargasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(CargasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
