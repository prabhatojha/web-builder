import { TestBed } from '@angular/core/testing';

import { LayeringService } from './layering.service';

describe('LayeringService', () => {
  let service: LayeringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayeringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
