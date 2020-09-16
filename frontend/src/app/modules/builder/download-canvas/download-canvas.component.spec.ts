import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCanvasComponent } from './download-canvas.component';

describe('DownloadCanvasComponent', () => {
  let component: DownloadCanvasComponent;
  let fixture: ComponentFixture<DownloadCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
