import { Component, OnInit, Input } from '@angular/core';
import html2canvas from 'html2canvas';

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
    console.log(this.selectedSizeId, this.activeType);
    switch (this.activeType) {
      case DownloadType.PDF:
        this.downloadAsPDF(); break;
      case DownloadType.PNG:
        this.downloadAsPNG(); break;
    }
  }

  downloadAsPDF() {

  }

  downloadAsPNG() {
    const imageSize = this.availableSizes.find(t => t.id === this.selectedSizeId);
    console.log(this.project, this.projectNode);

    html2canvas(this.projectNode, {
      allowTaint: true,
      backgroundColor: null,
      useCORS: true,
      scale: imageSize.scale
    }).then(canvas => {
      this.saveAs(canvas.toDataURL(), 'Canvias-art.png');
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
