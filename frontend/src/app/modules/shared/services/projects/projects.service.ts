import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { debounce, debounceTime, map } from 'rxjs/operators';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectSubject = new Subject<any>();
  project: any;
  isProjectSaved = true;

  constructor(private httpService: HttpService) {
    this.projectSubject.asObservable().pipe(debounceTime(5000)).subscribe(t => {
      this.saveProject();
    });
  }

  getProjects() {
    const url = API_ENDPOINT.PROJECTS;
    return this.httpService.get(url);
  }

  getProjectById(projectId) {
    const url = API_ENDPOINT.PROJECTS + `/${projectId}`;
    return this.httpService.get(url).pipe(map(res => {
      this.project = res;
      return res;
    }));
  }

  createProject(project: any) {
    const url = API_ENDPOINT.PROJECTS;
    return this.httpService.post(url, project);
  }

  // Call only if sync save
  saveProject() {
    if (this.isProjectSaved) {
      return;
    }
    const url = API_ENDPOINT.PROJECTS;
    return this.httpService.put(url, this.project).subscribe(t => {
      this.isProjectSaved = true;
    });
  }

  // Call async save
  submitSaveRequest() {
    this.isProjectSaved = false;
    this.projectSubject.next();
  }
}
