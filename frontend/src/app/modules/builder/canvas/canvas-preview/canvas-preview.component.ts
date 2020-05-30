import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CanvasUtils } from 'src/app/utils/canvas.utils';

@Component({
  selector: 'app-canvas-preview',
  templateUrl: './canvas-preview.component.html',
  styleUrls: ['./canvas-preview.component.scss']
})
export class CanvasPreviewComponent implements OnInit {

  @Input() project: any;
  @Output() closePreview = new EventEmitter();

  @ViewChild('canvasPreview', { static: true }) canvasPreview: ElementRef;

  clonedProject: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.project);
    this.canvasPreview.nativeElement.appendChild(CanvasUtils.buildDom(this.project.canvaElement));
  }

  updatePreview() {
    // this.canvasPreview.nativeElement.appendChild(CanvasUtils.buildDom(this.project));
  }

  close() {
    this.closePreview.emit();
  }

  print() {
    CanvasUtils.print(this.canvasPreview.nativeElement.innerHTML);
  }

}
