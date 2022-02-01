import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LimitHeaderService } from './limitHeader.service';

describe('LimitHeaderService', () => {
  let service: LimitHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(LimitHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
