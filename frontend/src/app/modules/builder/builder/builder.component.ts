import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECT_TYPE, CANVAS_SIZES } from 'src/app/constants/canvas-size.constants';
import { CANVAS_PROJECT } from '../canvas/canvas.config';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { CommonUtils } from 'src/app/utils/common.utils';
import { DownloadCanvasComponent } from '../download-canvas/download-canvas.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  @ViewChild('downloadCanvasModal') downloadCanvasModal: DownloadCanvasComponent;

  project;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    const routSnapshot = this.activatedRoute.snapshot;
    const id = routSnapshot.queryParams.id;
    const type = routSnapshot.queryParams.type;

    switch (type) {
      case PROJECT_TYPE.BLANK:
      default:
        this.initBlankProject(id);
    }
  }

  initBlankProject(id) {
    const newProject = CommonUtils.cloneDeep(CANVAS_PROJECT);
    const blankPojectSize = CANVAS_SIZES.find(t => t.id === id);
    if (blankPojectSize) {
      newProject.canvasElement.style[CSS_PROPERTIES.WIDTH] = blankPojectSize.dimention.x + 'px';
      newProject.canvasElement.style[CSS_PROPERTIES.HEIGHT] = blankPojectSize.dimention.y + 'px';
    }

    this.project = newProject;
  }

  openDownloadPopup(projectNode) {
    this.downloadCanvasModal.open(projectNode);
  }

}
