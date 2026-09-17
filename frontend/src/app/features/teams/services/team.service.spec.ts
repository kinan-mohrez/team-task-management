import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { TeamService } from './team.service';
import { CreateTeamRequest } from 'src/app/core/dto/teams/create-team-request.model';
import { UpdateTeamRequest } from 'src/app/core/dto/teams/update-team-request.model';
import { TeamResponse } from 'src/app/core/dto/teams/team-response.model';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { Team } from 'src/app/models/team/team.model';


describe('TeamService', () => {
  const apiUrl = 'http://localhost:8080/api/teams';
  let service: TeamService;
  let httpMock: HttpTestingController;
  let response: TeamResponse;
  let expected: Team;
  let pageResponse: PageResponse<TeamResponse>;
  let createRequest: CreateTeamRequest;
  let updateRequest: UpdateTeamRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);

    response = {
      id: 5,
      name: 'Frontend',
      description: 'Frontend team',

    };

    // Expected values are independent of the production mapper.
    expected = {
      id: 5,
      name: 'Frontend',
      description: 'Frontend team',

    };

    createRequest = {
      name: 'Frontend',
      description: 'Frontend team',
    };
    updateRequest = {
      name: 'Platform',
      description: 'Platform team',
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

  describe('getTeams', () => {
    it('should send pagination and sorting parameters and map the page', () => {
      let actual: PageResponse<Team> | undefined;

      service.getTeams(2, 10, 'name', 'desc').subscribe((result) => {
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
      service.getTeams(0, 10, 'id', 'asc', '  test query  ').subscribe();

      const req = httpMock.expectOne((request) => request.url === apiUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('search')).toBe('test query');
      expect(req.request.params.get('sortDirection')).toBe('asc');

      req.flush(pageResponse);
    });

    [undefined, '', '   '].forEach((search) => {
      it('should omit search for ' + JSON.stringify(search), () => {
        service.getTeams(0, 10, 'id', 'asc', search).subscribe();

        const req = httpMock.expectOne((request) => request.url === apiUrl);
        expect(req.request.params.has('search')).toBeFalse();

        req.flush(pageResponse);
      });
    });

    it('should map every item and preserve page metadata', () => {
      const multiplePage: PageResponse<TeamResponse> = {
        ...pageResponse,
        content: [response, { ...response, id: 6 }],
        totalElements: 22,
        numberOfElements: 2,
      };
      let actual: PageResponse<Team> | undefined;

      service.getTeams(2, 10, 'name', 'desc').subscribe((result) => {
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
      const emptyPage: PageResponse<TeamResponse> = {
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
      let actual: PageResponse<Team> | undefined;

      service.getTeams(0, 10, 'id', 'asc').subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl);
      req.flush(emptyPage);

      expect(actual).toEqual(emptyPage);
    });
  });

  describe('getTeamById', () => {
    it('should send GET to the correct URL and map the response', () => {
      let actual: Team | undefined;

      service.getTeamById(5).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(apiUrl + '/5');
      expect(req.request.method).toBe('GET');
      req.flush({ ...response, serverOnlyField: 'ignored' });

      expect(actual).toEqual(expected);
    });

    it('should pass a 404 response to the subscriber', () => {
      let actualError: HttpErrorResponse | undefined;
      const errorBody = { message: 'Team not found' };

      service.getTeamById(999).subscribe({
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

  describe('createTeam', () => {
    it('should send POST with the request body and map the response', () => {
      let actual: Team | undefined;

      service.createTeam(createRequest).subscribe((result) => {
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

  describe('updateTeam', () => {
    it('should send PUT with the updated data and map the response', () => {
      const updated: Team = {
        id: 5,
        name: 'Platform',
      description: 'Platform team',

      };
      let actual: Team | undefined;

      service.updateTeam(5, updateRequest).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(apiUrl + '/5');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);
      req.flush({ ...updated, serverOnlyField: 'ignored' });

      expect(actual).toEqual(updated);
    });
  });

  describe('deleteTeam', () => {
    it('should send DELETE to the correct URL and complete successfully', () => {
      let completed = false;

      service.deleteTeam(5).subscribe({
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
        name: 'getTeams',
        call: () => service.getTeams(0, 10, 'id', 'asc'),
        url: apiUrl,
        method: 'GET',
      },
      {
        name: 'getTeamById',
        call: () => service.getTeamById(5),
        url: apiUrl + '/5',
        method: 'GET',
      },
      {
        name: 'createTeam',
        call: () => service.createTeam(createRequest),
        url: apiUrl,
        method: 'POST',
      },
      {
        name: 'updateTeam',
        call: () => service.updateTeam(5, updateRequest),
        url: apiUrl + '/5',
        method: 'PUT',
      },
      {
        name: 'deleteTeam',
        call: () => service.deleteTeam(5),
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
