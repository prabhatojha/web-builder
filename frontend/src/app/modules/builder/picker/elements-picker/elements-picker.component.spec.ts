import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsPickerComponent } from './elements-picker.component';

describe('ElementsPickerComponent', () => {
  let component: ElementsPickerComponent;
  let fixture: ComponentFixture<ElementsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
