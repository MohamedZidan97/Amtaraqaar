import { TestBed } from '@angular/core/testing';

import { RequestAdsService } from './request-ads.service';

describe('RequestAdsService', () => {
  let service: RequestAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
