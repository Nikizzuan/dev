import { TestBed } from '@angular/core/testing';

import { BuycouponService } from './buycoupon.service';

describe('BuycouponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuycouponService = TestBed.get(BuycouponService);
    expect(service).toBeTruthy();
  });
});
