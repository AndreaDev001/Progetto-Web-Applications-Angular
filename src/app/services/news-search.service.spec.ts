import { TestBed } from '@angular/core/testing';

import { NewsSearchService } from './news-search.service';

describe('NewsSearchService', () => {
  let service: NewsSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
