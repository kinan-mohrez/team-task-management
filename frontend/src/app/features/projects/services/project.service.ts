import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CreateProjectRequest } from 'src/app/core/dto/projects/create-project-request.model';
import { UpdateProjectRequest } from 'src/app/core/dto/projects/update-project-request.model';
import { ProjectResponse } from 'src/app/core/dto/projects/project-response.model';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { ProjectMapper } from 'src/app/core/mappers/project.mapper';
import { Project } from 'src/app/models/project/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl: string = 'http://localhost:8080/api/projects';

  public constructor(private readonly http: HttpClient) {}

  public getProjects(
    page: number,
    size: number,
    sortBy: string,
    sortDirection: string,
    search?: string,
  ): Observable<PageResponse<Project>> {
    let params: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<PageResponse<ProjectResponse>>(this.apiUrl, { params })
      .pipe(
        map((response: PageResponse<ProjectResponse>) => ({
          ...response,
          content: ProjectMapper.fromResponses(response.content),
        })),
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
