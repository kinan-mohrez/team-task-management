import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ProjectService } from './project.service';
import { CreateProjectRequest } from 'src/app/core/dto/projects/create-project-request.model';
import { UpdateProjectRequest } from 'src/app/core/dto/projects/update-project-request.model';
import { ProjectResponse } from 'src/app/core/dto/projects/project-response.model';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { Project } from 'src/app/models/project/project.model';
import { ProjectStatus } from 'src/app/shared/enums/project-status';

describe('ProjectService', () => {
  const apiUrl = 'http://localhost:8080/api/projects';
  let service: ProjectService;
  let httpMock: HttpTestingController;
  let response: ProjectResponse;
  let expected: Project;
  let pageResponse: PageResponse<ProjectResponse>;
  let createRequest: CreateProjectRequest;
  let updateRequest: UpdateProjectRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);

    response = {
      id: 5,
      name: 'Task Management',
      description: 'Team workspace',
      startDate: '2026-09-01',
      endDate: '2026-10-01',
      status: ProjectStatus.PLANNING,

    };

    // Expected values are independent of the production mapper.
    expected = {
      id: 5,
      name: 'Task Management',
      description: 'Team workspace',
      startDate: '2026-09-01',
      endDate: '2026-10-01',
      status: ProjectStatus.PLANNING,

    };

    createRequest = {
      name: 'Task Management',
      description: 'Team workspace',
      startDate: '2026-09-01',
      endDate: '2026-10-01',
      status: ProjectStatus.PLANNING,
    };
    updateRequest = {
      name: 'Platform',
      description: 'Updated workspace',
      startDate: '2026-09-10',
      endDate: '2026-11-01',
      status: ProjectStatus.IN_PROGRESS,
    };
    pageResponse = {
      content: [response],
      totalElements: 21,
      totalPages: 3,
      size: 10,
      number: 2,
      first: false,
      last: true,
      numberOfElements: 1,
      empty: false,
    };
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProjects', () => {
    it('should send pagination and sorting parameters and map the page', () => {
      let actual: PageResponse<Project> | undefined;

      service.getProjects(2, 10, 'name', 'desc').subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl);

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('size')).toBe('10');
      expect(req.request.params.get('sortBy')).toBe('name');
      expect(req.request.params.get('sortDirection')).toBe('desc');
      expect(req.request.params.has('search')).toBeFalse();

      // Extra server fields must not leak into the mapped model.
      req.flush({
        ...pageResponse,
        content: [{ ...response, serverOnlyField: 'ignored' }],
      });

      expect(actual).toEqual({ ...pageResponse, content: [expected] });
    });

    it('should trim search and preserve ascending sorting', () => {
      service.getProjects(0, 10, 'id', 'asc', '  test query  ').subscribe();

      const req = httpMock.expectOne((request) => request.url === apiUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('search')).toBe('test query');
      expect(req.request.params.get('sortDirection')).toBe('asc');

      req.flush(pageResponse);
    });

    [undefined, '', '   '].forEach((search) => {
      it('should omit search for ' + JSON.stringify(search), () => {
        service.getProjects(0, 10, 'id', 'asc', search).subscribe();

        const req = httpMock.expectOne((request) => request.url === apiUrl);
        expect(req.request.params.has('search')).toBeFalse();

        req.flush(pageResponse);
      });
    });

    it('should map every item and preserve page metadata', () => {
      const multiplePage: PageResponse<ProjectResponse> = {
        ...pageResponse,
        content: [response, { ...response, id: 6 }],
        totalElements: 22,
        numberOfElements: 2,
      };
      let actual: PageResponse<Project> | undefined;

      service.getProjects(2, 10, 'name', 'desc').subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl);
      req.flush({
        ...multiplePage,
        content: multiplePage.content.map((item) => ({
          ...item,
          serverOnlyField: 'ignored',
        })),
      });

      expect(actual).toEqual({
        ...multiplePage,
        content: [expected, { ...expected, id: 6 }],
      });
    });

    it('should return an empty page when there are no results', () => {
      const emptyPage: PageResponse<ProjectResponse> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 0,
        first: true,
        last: true,
        numberOfElements: 0,
        empty: true,
      };
      let actual: PageResponse<Project> | undefined;

      service.getProjects(0, 10, 'id', 'asc').subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl);
      req.flush(emptyPage);

      expect(actual).toEqual(emptyPage);
    });
  });

  describe('getProjectById', () => {
    it('should send GET to the correct URL and map the response', () => {
      let actual: Project | undefined;

      service.getProjectById(5).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(apiUrl + '/5');
      expect(req.request.method).toBe('GET');
      req.flush({ ...response, serverOnlyField: 'ignored' });

      expect(actual).toEqual(expected);
    });

    it('should pass a 404 response to the subscriber', () => {
      let actualError: HttpErrorResponse | undefined;
      const errorBody = { message: 'Project not found' };

      service.getProjectById(999).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error: HttpErrorResponse) => {
          actualError = error;
        },
      });

      const req = httpMock.expectOne(apiUrl + '/999');
      req.flush(errorBody, { status: 404, statusText: 'Not Found' });

      expect(actualError).toBeDefined();
      expect(actualError?.status).toBe(404);
      expect(actualError?.error).toEqual(errorBody);
    });
  });

  describe('createProject', () => {
    it('should send POST with the request body and map the response', () => {
      let actual: Project | undefined;

      service.createProject(createRequest).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createRequest);

      req.flush(
        { ...response, serverOnlyField: 'ignored' },
        { status: 201, statusText: 'Created' },
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('updateProject', () => {
    it('should send PUT with the updated data and map the response', () => {
      const updated: Project = {
        id: 5,
        name: 'Platform',
      description: 'Updated workspace',
      startDate: '2026-09-10',
      endDate: '2026-11-01',
      status: ProjectStatus.IN_PROGRESS,

      };
      let actual: Project | undefined;

      service.updateProject(5, updateRequest).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(apiUrl + '/5');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);
      req.flush({ ...updated, serverOnlyField: 'ignored' });

      expect(actual).toEqual(updated);
    });
  });

  describe('deleteProject', () => {
    it('should send DELETE to the correct URL and complete successfully', () => {
      let completed = false;

      service.deleteProject(5).subscribe({
        complete: () => {
          completed = true;
        },
      });

      const req = httpMock.expectOne(apiUrl + '/5');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toBeNull();

      req.flush(null, { status: 204, statusText: 'No Content' });

      expect(completed).toBeTrue();
    });
  });

  describe('HTTP errors', () => {
    const cases: Array<{
      name: string;
      call: () => Observable<unknown>;
      url: string;
      method: string;
    }> = [
      {
        name: 'getProjects',
        call: () => service.getProjects(0, 10, 'id', 'asc'),
        url: apiUrl,
        method: 'GET',
      },
      {
        name: 'getProjectById',
        call: () => service.getProjectById(5),
        url: apiUrl + '/5',
        method: 'GET',
      },
      {
        name: 'createProject',
        call: () => service.createProject(createRequest),
        url: apiUrl,
        method: 'POST',
      },
      {
        name: 'updateProject',
        call: () => service.updateProject(5, updateRequest),
        url: apiUrl + '/5',
        method: 'PUT',
      },
      {
        name: 'deleteProject',
        call: () => service.deleteProject(5),
        url: apiUrl + '/5',
        method: 'DELETE',
      },
    ];

    cases.forEach((testCase) => {
      it('should propagate server errors from ' + testCase.name, () => {
        let actualError: HttpErrorResponse | undefined;
        const errorBody = { message: 'Unexpected server error' };

        testCase.call().subscribe({
          next: () => fail('Expected an error, not a successful response'),
          error: (error: HttpErrorResponse) => {
            actualError = error;
          },
        });

        const req = httpMock.expectOne(
          (request) =>
            request.url === testCase.url &&
            request.method === testCase.method,
        );
        req.flush(errorBody, {
          status: 500,
          statusText: 'Internal Server Error',
        });

        expect(actualError).toBeDefined();
        expect(actualError?.status).toBe(500);
        expect(actualError?.error).toEqual(errorBody);
      });
    });
  });
});
