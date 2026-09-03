import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CreateTaskRequest } from 'src/app/core/dto/tasks/create-task-request.model';
import { TaskResponse } from 'src/app/core/dto/tasks/task-response.model';
import { UpdateTaskRequest } from 'src/app/core/dto/tasks/update-task-request.model';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { TaskMapper } from 'src/app/core/mappers/task.mapper';
import { Task } from 'src/app/models/tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl: string = 'http://localhost:8080/api/tasks';

  public constructor(private readonly http: HttpClient) {}

  public getTasks(
    page: number,
    size: number,
    sortBy: string,
    sortDirection: string,
    search?: string,
  ): Observable<PageResponse<Task>> {
    let params: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<PageResponse<TaskResponse>>(this.apiUrl, { params })
      .pipe(
        map((response: PageResponse<TaskResponse>) => ({
          ...response,
          content: TaskMapper.fromResponses(response.content),
        })),
      );
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http
      .get<TaskResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((taskResponse: TaskResponse) =>
          TaskMapper.fromResponse(taskResponse),
        ),
      );
  }

  public createTask(request: CreateTaskRequest): Observable<Task> {
    return this.http
      .post<TaskResponse>(this.apiUrl, request)
      .pipe(
        map((taskResponse: TaskResponse) =>
          TaskMapper.fromResponse(taskResponse),
        ),
      );
  }

  public updateTask(id: number, request: UpdateTaskRequest): Observable<Task> {
    return this.http
      .put<TaskResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(
        map((taskResponse: TaskResponse) =>
          TaskMapper.fromResponse(taskResponse),
        ),
      );
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
