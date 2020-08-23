import { TestBed } from '@angular/core/testing';

import { SubCatgoryService } from './sub-catgory.service';

describe('SubCatgoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubCatgoryService = TestBed.get(SubCatgoryService);
    expect(service).toBeTruthy();
  });
});
