import { TestBed } from '@angular/core/testing';

import { UserDbStoreService } from './user-db-store.service';

describe('UserDbStoreService', () => {
  let service: UserDbStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDbStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
