import { Component, OnInit, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { DEFAULT_PROJECT_SIZE } from '../canvas/canvas.config';
import { CSSUtils } from 'src/app/utils/css.utils';
import { CSS_CLASSES } from 'src/app/constants/css-constants';

export enum DownloadType {
  PDF,
  PNG
}
@Component({
  selector: 'app-download-canvas',
  templateUrl: './download-canvas.component.html',
  styleUrls: ['./download-canvas.component.scss']
})
export class DownloadCanvasComponent implements OnInit {

  @Input() project;
  @Input() projectDimention = DEFAULT_PROJECT_SIZE;
  DownloadTypes = DownloadType;
  activeType: DownloadType = DownloadType.PNG;
  downloadOptions = [
    {
      icon: 'png',
      type: DownloadType.PNG,
      label: 'PNG'
    },
    {
      icon: 'pdf',
      type: DownloadType.PDF,
      label: 'PDF'
    }
  ];
  keepWatermark = true;

  selectedSizeId = '19afjjasfk2k1l2';
  availableSizes = [
    {
      id: '19afjjasfk2k1l2',
      label: 'Small',
      scale: 1
    },
    {
      id: 'sjkfa9asf9asfa778',
      label: 'Medium',
      scale: 2
    },
    {
      id: 'asfaj12u66asuss',
      label: 'Large',
      scale: 3
    }
  ];

  projectNode;
  isVisible = false;
  disableDownload = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  open(projectNode) {
    this.projectNode = projectNode;
    this.toggleModal();
  }

  toggleModal() {
    this.isVisible = !this.isVisible;
  }

  beginDownload() {
    this.disableDownload = true;
    switch (this.activeType) {
      case DownloadType.PDF:
        this.downloadAsPDF(); break;
      case DownloadType.PNG:
        const imageSize = this.availableSizes.find(t => t.id === this.selectedSizeId);
        this.downloadAsPNG(imageSize.scale); break;
    }
  }

  downloadAsPDF() {
    this.convertToCanvas(3, this.saveAsPDF);
  }

  downloadAsPNG(scale) {
    this.convertToCanvas(scale, this.saveAsPng);
  }

  saveAsPng = (uri) => {

    const link = document.createElement('a');

    if (typeof link.download === 'string') {

      link.href = uri;
      link.download = 'Canvias-poster.png';

      // Firefox requires the link to be in the body
      document.body.appendChild(link);

      // simulate click
      link.click();

      // remove the link when done
      document.body.removeChild(link);

    } else {

      window.open(uri);

    }
    this.disableDownload = false;
  }

  saveAsPDF = (uri) => {
    const w = this.projectDimention.w;
    const h = this.projectDimention.h;
    const mode = w <= h ? 'p' : 'l'; // Weather to print landscape-'l' or portrait-'p'
    const doc = new jsPDF(mode, 'px', [w, h]);
    doc.addImage(uri, 'PNG', 0, 0, w, h);
    doc.save('Canvias-poster.pdf');
    this.disableDownload = false;
  }

  convertToCanvas(scale, callback) {
    html2canvas(this.projectNode, {
      allowTaint: true,
      backgroundColor: null,
      useCORS: true,
      onclone: this.addWaterMark,
      scale
    }).then(canvas => {
      callback(canvas.toDataURL());
    }).catch(err => {
      this.disableDownload = false;
    });
  }

  addWaterMark = (doc: Document) => {
    if (this.keepWatermark) {
      const ele = doc.getElementsByClassName(CSS_CLASSES.CANVAS_TEMPLATE)[0];
      const img = doc.createElement('img');
      img.src = '/assets/images/watermark.png';
      img.style.cssText = 'position: absolute; left: 10px; top: 10px; z-index: 1000000;';
      ele.appendChild(img);
    }
  }
}
