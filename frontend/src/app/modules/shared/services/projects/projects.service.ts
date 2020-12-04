import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpService: HttpService) {
  }

  getProjects() {
    const url = API_ENDPOINT.PROJECTS;
    return this.httpService.get(url);
  }

  getProjectById(projectId) {
    const url = API_ENDPOINT.PROJECTS + `/${projectId}`;
    return this.httpService.get(url);
  }

  createProject(project: any) {
    const url = API_ENDPOINT.PROJECTS;
    return this.httpService.put(url, project);
  }

  saveProject(projectId, project: any) {
    const url = API_ENDPOINT.PROJECTS + `/${projectId}`;
    return this.httpService.put(url, project);
  }
}
