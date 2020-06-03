import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAlignmentComponent } from './text-alignment.component';

describe('TextAlignmentComponent', () => {
  let component: TextAlignmentComponent;
  let fixture: ComponentFixture<TextAlignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAlignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
