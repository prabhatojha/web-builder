import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../shared/services/projects/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projectsSub: Subscription;

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsSub = this.projectService.getProjects().subscribe(result => {
      console.log('projects', result);
      this.processProjects(result);
    });
  }

  processProjects(result) {

  }

  ngOnDestroy() {
    this.projectsSub && this.projectsSub.unsubscribe();
  }
}
