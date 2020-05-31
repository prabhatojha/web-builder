import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasScaleComponent } from './canvas-scale.component';

describe('CanvasScaleComponent', () => {
  let component: CanvasScaleComponent;
  let fixture: ComponentFixture<CanvasScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
