import { TestBed } from '@angular/core/testing';

import { RetailerinfoService } from './retailerinfo.service';

describe('RetailerinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetailerinfoService = TestBed.get(RetailerinfoService);
    expect(service).toBeTruthy();
  });
});
