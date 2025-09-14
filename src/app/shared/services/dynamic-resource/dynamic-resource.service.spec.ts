import { DynamicResourceService } from './dynamic-resource.service';
import { TestBed } from '@angular/core/testing';

describe('DynamicResourceService', () => {
  let service: DynamicResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
