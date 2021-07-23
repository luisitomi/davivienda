import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { OrigenService } from './origen.service';

describe('OrigenService', () => {
  let service: OrigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(OrigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
