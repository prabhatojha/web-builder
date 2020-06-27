import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';

@Component({
  selector: 'app-canvas-preview',
  templateUrl: './canvas-preview.component.html',
  styleUrls: ['./canvas-preview.component.scss']
})
export class CanvasPreviewComponent implements OnInit {

  @Input() canvasElement: any;
  @Output() closePreview = new EventEmitter();

  @ViewChild('canvasPreview', { static: true }) canvasPreview: ElementRef;

  clonedProject: any;

  constructor() { }

  ngOnInit(): void {
    this.canvasElement.style[CSS_PROPERTIES.OVERFLOW] = CSS_PROPERTIES.OVERFLOW_HIDDEN;
    this.canvasPreview.nativeElement.appendChild(CanvasUtils.buildDom(this.canvasElement));
  }

  close() {
    this.closePreview.emit();
  }

  print() {
    CanvasUtils.print(this.canvasPreview.nativeElement.innerHTML);
  }

}
