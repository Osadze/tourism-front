import { TestBed } from '@angular/core/testing';

import { DefIndicatorService } from './def-indicator.service';

describe('DefIndicatorService', () => {
  let service: DefIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
