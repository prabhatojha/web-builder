import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../constants/app-routes';
import { EventTypes, EventerService } from '../modules/shared/services/eventer.service';
import { ProjectsService } from '../modules/shared/services/projects/projects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showCanvasSizeOptions = false;
  APP_ROUTES = APP_ROUTES;

  constructor(private eventer: EventerService, public projectService: ProjectsService) { }

  ngOnInit(): void {
  }

  previewCanvas() {
    this.eventer.send({ type: EventTypes.CANVAS_PREVIEW, value: '' });
  }

  downloadCanvas() {
    this.eventer.send({ type: EventTypes.CANVAS_DOWNLOAD, value: '' });
  }

  saveProject() {
    this.projectService.saveProject();
  }
}
