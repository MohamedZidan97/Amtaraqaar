import { TestBed } from '@angular/core/testing';

import { PaymentPackagessService } from './payment-packagess.service';

describe('PaymentPackagessService', () => {
  let service: PaymentPackagessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentPackagessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
