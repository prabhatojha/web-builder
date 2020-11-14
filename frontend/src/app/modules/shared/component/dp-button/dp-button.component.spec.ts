import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpButtonComponent } from './dp-button.component';

describe('DpButtonComponent', () => {
  let component: DpButtonComponent;
  let fixture: ComponentFixture<DpButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
