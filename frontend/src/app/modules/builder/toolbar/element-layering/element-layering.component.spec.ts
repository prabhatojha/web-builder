import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementLayeringComponent } from './element-layering.component';

describe('ElementLayeringComponent', () => {
  let component: ElementLayeringComponent;
  let fixture: ComponentFixture<ElementLayeringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementLayeringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementLayeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
