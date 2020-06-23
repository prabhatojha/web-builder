import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorPickerComponent } from './vector-picker.component';

describe('VectorPickerComponent', () => {
  let component: VectorPickerComponent;
  let fixture: ComponentFixture<VectorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
