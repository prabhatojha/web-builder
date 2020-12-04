import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { CommonUtils } from 'src/app/utils/common.utils';
import { CANVAS_PROJECT } from '../../builder/canvas/canvas.config';
import { ProjectsService } from '../../shared/services/projects/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projectsSub: Subscription;

  constructor(private projectService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectsSub = this.projectService.getProjects().subscribe(result => {
      console.log('projects', result);
      this.processProjects(result);
    });
  }

  processProjects(result) {

  }

  createNewProject() {
    const newProject = {
      name: 'My Project 1',
      pages: [CANVAS_PROJECT]
    };
    this.projectService.createProject(newProject).subscribe((res: any) => {
      this.router.navigateByUrl(APP_ROUTES.BUILD + `/${res.id}`);
    });
  }

  ngOnDestroy() {
    this.projectsSub && this.projectsSub.unsubscribe();
  }
}
