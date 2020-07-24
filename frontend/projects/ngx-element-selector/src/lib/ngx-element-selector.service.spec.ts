import { TestBed } from '@angular/core/testing';

import { NgxElementSelectorService } from './ngx-element-selector.service';

describe('NgxElementSelectorService', () => {
  let service: NgxElementSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxElementSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
