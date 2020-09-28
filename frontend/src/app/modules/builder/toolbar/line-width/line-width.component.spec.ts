import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineWidthComponent } from './line-width.component';

describe('LineWidthComponent', () => {
  let component: LineWidthComponent;
  let fixture: ComponentFixture<LineWidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineWidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
