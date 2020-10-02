import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPickerComponent } from './upload-picker.component';

describe('UploadPickerComponent', () => {
  let component: UploadPickerComponent;
  let fixture: ComponentFixture<UploadPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
