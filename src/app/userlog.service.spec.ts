import { TestBed } from '@angular/core/testing';

import { UserlogService } from './userlog.service';

describe('UserlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserlogService = TestBed.get(UserlogService);
    expect(service).toBeTruthy();
  });
});
