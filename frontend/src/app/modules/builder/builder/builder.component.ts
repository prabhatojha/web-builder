import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECT_TYPE, CANVAS_SIZES } from 'src/app/constants/canvas-size.constants';
import { CANVAS_PROJECT, DEFAULT_PROJECT_SIZE } from '../canvas/canvas.config';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { CommonUtils } from 'src/app/utils/common.utils';
import { DownloadCanvasComponent } from '../download-canvas/download-canvas.component';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  @ViewChild('downloadCanvasModal') downloadCanvasModal: DownloadCanvasComponent;

  pickerVisible = false;
  project;
  projectDimention: { w: number, h: number } = DEFAULT_PROJECT_SIZE;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectsService,
    private authService: AuthService) {
    CanvasUtils.setProjectService(projectService);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    const routSnapshot = this.activatedRoute.snapshot;
    const id = routSnapshot.params.id;
    if (id) {
      this.loadProject(id);
    } else {
      this.router.navigateByUrl(APP_ROUTES.DASHBOARD);
    }
  }

  onPickerVisibility(e) {
    this.pickerVisible = e;
  }

  loadProject(id) {
    this.projectService.getProjectById(id).subscribe(res => {
      this.initProject(res);
      // this.projectService.saveProject(res).subscribe(t => { });
    }, err => {
    });
  }

  initProject(project) {
    this.project = project.pages[0];
  }

  openDownloadPopup(projectNode) {
    this.downloadCanvasModal.open(projectNode);
  }

}
