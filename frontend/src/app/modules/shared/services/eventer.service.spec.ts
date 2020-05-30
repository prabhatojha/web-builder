import { TestBed } from '@angular/core/testing';

import { EventerService } from './eventer.service';

describe('EventerService', () => {
  let service: EventerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
