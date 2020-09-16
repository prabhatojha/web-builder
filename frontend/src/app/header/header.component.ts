import { Component, OnInit } from '@angular/core';
import { EventTypes, EventerService } from '../modules/shared/services/eventer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showCanvasSizeOptions = false;

  constructor(private eventer: EventerService) { }

  ngOnInit(): void {
  }

  previewCanvas() {
    this.eventer.send({ type: EventTypes.CANVAS_PREVIEW, value: '' });
  }

  downloadCanvas() {
    this.eventer.send({ type: EventTypes.CANVAS_DOWNLOAD, value: '' });
  }
}
