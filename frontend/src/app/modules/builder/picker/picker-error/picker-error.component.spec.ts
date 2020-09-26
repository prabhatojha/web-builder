import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerErrorComponent } from './picker-error.component';

describe('PickerErrorComponent', () => {
  let component: PickerErrorComponent;
  let fixture: ComponentFixture<PickerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
