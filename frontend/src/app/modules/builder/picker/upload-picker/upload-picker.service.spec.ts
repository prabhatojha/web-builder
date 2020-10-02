import { TestBed } from '@angular/core/testing';

import { UploadPickerService } from './upload-picker.service';

describe('UploadPickerService', () => {
  let service: UploadPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
