import { TestBed } from '@angular/core/testing';

import { CapecService } from './capec.service';

describe('CapecService', () => {
  let service: CapecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
