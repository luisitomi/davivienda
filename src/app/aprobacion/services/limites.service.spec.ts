import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LimitesService } from './limites.service';

describe('LimitesService', () => {
  let service: LimitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(LimitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
