import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';
import html2canvas from 'html2canvas';


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
    this.canvasElement.style[CSS_PROPERTIES.OVERFLOW] = CSS_PROPERTY_VALUES.OVERFLOW_HIDDEN;
    this.canvasPreview.nativeElement.appendChild(CanvasUtils.buildDom(this.canvasElement));
  }

  close() {
    this.closePreview.emit();
  }

  print() {
    html2canvas(document.querySelector('#canvas-preview'), {
      allowTaint: true,
      backgroundColor: 'rgba(0,0,0,0)',
      width: 500,
      height: 500,
      useCORS: true
    }).then(canvas => {
      this.saveAs(canvas.toDataURL(), 'file-name.png');
      // document.querySelector('#canvas-preview-container').appendChild(canvas);
    });

  }


  saveAs(uri, filename) {

    const link = document.createElement('a');

    if (typeof link.download === 'string') {

      link.href = uri;
      link.download = filename;

      // Firefox requires the link to be in the body
      document.body.appendChild(link);

      // simulate click
      link.click();

      // remove the link when done
      document.body.removeChild(link);

    } else {

      window.open(uri);

    }
  }

}
