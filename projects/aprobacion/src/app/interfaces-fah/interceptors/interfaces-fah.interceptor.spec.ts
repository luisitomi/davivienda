import { TestBed } from '@angular/core/testing';

import { InterfacesFahInterceptor } from './interfaces-fah.interceptor';

describe('InterfacesFahInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterfacesFahInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterfacesFahInterceptor = TestBed.inject(InterfacesFahInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
