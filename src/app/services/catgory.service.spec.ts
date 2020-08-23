import { TestBed } from '@angular/core/testing';

import { CatgoryService } from './catgory.service';

describe('CatgoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatgoryService = TestBed.get(CatgoryService);
    expect(service).toBeTruthy();
  });
});
