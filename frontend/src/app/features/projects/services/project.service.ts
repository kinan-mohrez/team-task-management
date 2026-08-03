import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CreateProjectRequest } from 'src/app/core/dto/projects/create-project-request.model';
import { UpdateProjectRequest } from 'src/app/core/dto/projects/update-project-request.model';
import { ProjectResponse } from 'src/app/core/dto/projects/project-response.model';
import { ProjectMapper } from 'src/app/core/mappers/project.mapper';
import { Project } from 'src/app/models/project/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl: string = 'http://localhost:8080/api/projects';

  public constructor(private readonly http: HttpClient) {}

  public getProjects(): Observable<Project[]> {
    return this.http
      .get<ProjectResponse[]>(this.apiUrl)
      .pipe(
        map((projectResponses: ProjectResponse[]) =>
          ProjectMapper.fromResponses(projectResponses),
        ),
      );
  }

  public getProjectById(id: number): Observable<Project> {
    return this.http
      .get<ProjectResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((projectResponse: ProjectResponse) =>
          ProjectMapper.fromResponse(projectResponse),
        ),
      );
  }

  public createProject(request: CreateProjectRequest): Observable<Project> {
    return this.http
      .post<ProjectResponse>(this.apiUrl, request)
      .pipe(
        map((projectResponse: ProjectResponse) =>
          ProjectMapper.fromResponse(projectResponse),
        ),
      );
  }

  public updateProject(
    id: number,
    request: UpdateProjectRequest,
  ): Observable<Project> {
    return this.http
      .put<ProjectResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(
        map((projectResponse: ProjectResponse) =>
          ProjectMapper.fromResponse(projectResponse),
        ),
      );
  }

  public deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
