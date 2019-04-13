import { TestBed } from '@angular/core/testing';

import { QRrequestService } from './qrrequest.service';

describe('QRrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QRrequestService = TestBed.get(QRrequestService);
    expect(service).toBeTruthy();
  });
});
