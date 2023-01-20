import { TestBed } from '@angular/core/testing';

import { AlertHandlerService } from './alert-handler.service';

describe('AlertHandlerService', () => {
  let service: AlertHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
