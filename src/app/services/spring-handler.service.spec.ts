import {TestBed} from '@angular/core/testing';

import {SpringHandlerService} from './spring-handler.service';

describe('SpringHandlerService', () => {
  let service: SpringHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
