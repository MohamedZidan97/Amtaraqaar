import { TestBed } from '@angular/core/testing';

import { DiffOpertService } from './diff-opert.service';

describe('DiffOpertService', () => {
  let service: DiffOpertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiffOpertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
