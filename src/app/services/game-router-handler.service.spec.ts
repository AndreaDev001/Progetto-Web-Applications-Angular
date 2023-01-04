import { TestBed } from '@angular/core/testing';

import { GameRouterHandlerService } from './game-router-handler.service';

describe('GameRouterHandlerService', () => {
  let service: GameRouterHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRouterHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
