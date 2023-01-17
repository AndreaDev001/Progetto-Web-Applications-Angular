import { TestBed } from '@angular/core/testing';

import { GameURLBuilderService } from './game-urlbuilder.service';

describe('GameURLBuilderService', () => {
  let service: GameURLBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameURLBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
