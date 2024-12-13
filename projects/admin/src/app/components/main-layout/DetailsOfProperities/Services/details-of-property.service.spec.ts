import { TestBed } from '@angular/core/testing';

import { DetailsOfPropertyService } from './details-of-property.service';

describe('DetailsOfPropertyService', () => {
  let service: DetailsOfPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsOfPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
