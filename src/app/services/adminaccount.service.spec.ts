import { TestBed } from '@angular/core/testing';

import { AdminaccountService } from './adminaccount.service';

describe('AdminaccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminaccountService = TestBed.get(AdminaccountService);
    expect(service).toBeTruthy();
  });
});
