import {TestBed} from '@angular/core/testing';

import {GameJSONReaderService} from './game-jsonreader.service';

describe('GameJSONReaderService', () => {
  let service: GameJSONReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameJSONReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
