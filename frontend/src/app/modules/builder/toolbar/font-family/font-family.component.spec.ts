import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontFamilyComponent } from './font-family.component';

describe('FontFamilyComponent', () => {
  let component: FontFamilyComponent;
  let fixture: ComponentFixture<FontFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
