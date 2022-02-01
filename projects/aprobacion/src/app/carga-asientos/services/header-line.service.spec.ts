import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HeaderLineService } from './header-line.service';

describe('HeaderLineService', () => {
  let service: HeaderLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(HeaderLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
