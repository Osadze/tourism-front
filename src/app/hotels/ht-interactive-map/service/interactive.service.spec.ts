import { TestBed } from '@angular/core/testing';

import { InteractiveService } from './interactive.service';

describe('InteractiveService', () => {
  let service: InteractiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
