import {TestBed} from '@angular/core/testing';

import {SearchHandlerService} from './search-handler.service';

describe('SearchHandlerService', () => {
  let service: SearchHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
