import { TestBed } from '@angular/core/testing';

import { ResizeEventerService } from './resize-eventer.service';

describe('ResizeEventerService', () => {
  let service: ResizeEventerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeEventerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
