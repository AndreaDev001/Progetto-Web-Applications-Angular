import {TestBed} from '@angular/core/testing';

import {DOMParserService} from './domparser.service';

describe('DOMParserService', () => {
  let service: DOMParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DOMParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
