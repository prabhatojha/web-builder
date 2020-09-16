import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
