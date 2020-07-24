import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxElementSelectorComponent } from './ngx-element-selector.component';

describe('NgxElementSelectorComponent', () => {
  let component: NgxElementSelectorComponent;
  let fixture: ComponentFixture<NgxElementSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxElementSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxElementSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
