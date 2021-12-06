import { TestBed } from '@angular/core/testing';

import { FiliacaoService } from './filiacao.service';

describe('FiliacaoService', () => {
  let service: FiliacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiliacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
