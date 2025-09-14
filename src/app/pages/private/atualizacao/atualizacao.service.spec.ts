import { TestBed } from '@angular/core/testing';

import { PDVService } from './atualizacao.service';

describe('PDVService', () => {
  let service: PDVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
