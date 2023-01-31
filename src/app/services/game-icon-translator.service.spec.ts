import { TestBed } from '@angular/core/testing';

import { GameIconTranslatorService } from './game-icon-translator.service';

describe('GameIconTranslatorService', () => {
  let service: GameIconTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameIconTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
