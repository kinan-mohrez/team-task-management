import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { UsersService } from './users.service';
import { CreateUserRequest } from 'src/app/core/dto/users/create-user-request.model';
import { UpdateUserRequest } from 'src/app/core/dto/users/update-user-request.model';
import { ChangePasswordRequest } from 'src/app/core/dto/users/change-password-request.model';
import { ResetPasswordRequest } from 'src/app/core/dto/users/reset-password-request.model';
import { UserResponse } from 'src/app/core/dto/users/user-response.model';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { User } from 'src/app/models/users/user.model';
import { UserRole } from 'src/app/shared/enums/user-role';

describe('UsersService', () => {
  const apiUrl = 'http://localhost:8080/api/users';

  let service: UsersService;
  let httpMock: HttpTestingController;

  let userResponse: UserResponse;
  let expectedUser: User;
  let pageResponse: PageResponse<UserResponse>;
  let createRequest: CreateUserRequest;
  let updateRequest: UpdateUserRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);

    userResponse = {
      id: 5,
      firstName: 'Ahmad',
      lastName: 'Ali',
      username: 'ahmad',
      email: 'ahmad@example.com',
      role: UserRole.MEMBER,
      enabled: true,
    };

    expectedUser = {
      id: 5,
      firstName: 'Ahmad',
      lastName: 'Ali',
      username: 'ahmad',
      email: 'ahmad@example.com',
      role: UserRole.MEMBER,
      enabled: true,
    };

    pageResponse = {
      content: [userResponse],
      totalElements: 21,
      totalPages: 3,
      size: 10,
      number: 2,
      first: false,
      last: true,
      numberOfElements: 1,
      empty: false,
    };

    createRequest = {
      firstName: 'Ahmad',
      lastName: 'Ali',
      username: 'ahmad',
      email: 'ahmad@example.com',
      password: 'ExamplePassword123!',
      role: UserRole.MEMBER,
      enabled: true,
    };

    updateRequest = {
      firstName: 'Sara',
      lastName: 'Omar',
      username: 'sara',
      email: 'sara@example.com',
      role: UserRole.MANAGER,
      enabled: false,
    };
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should send pagination and sorting parameters and map the page', () => {
      let actual: PageResponse<User> | undefined;

      service.getUsers(2, 10, 'username', 'desc').subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl);

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('size')).toBe('10');
      expect(req.request.params.get('sortBy')).toBe('username');
      expect(req.request.params.get('sortDirection')).toBe('desc');
      expect(req.request.params.has('search')).toBeFalse();

      req.flush({
        ...pageResponse,
        content: [{ ...userResponse, serverOnlyField: 'ignored' }],
      });

      expect(actual).toEqual({
        ...pageResponse,
        content: [expectedUser],
      });
    });

    it('should trim search before adding it to the query parameters', () => {
      service.getUsers(0, 10, 'id', 'asc', '  ahmad  ').subscribe();

      const req = httpMock.expectOne((request) => request.url === apiUrl);

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('search')).toBe('ahmad');

      req.flush(pageResponse);
    });

    [undefined, '', '   '].forEach((search) => {
      it(`should omit search when its value is ${JSON.stringify(search)}`, () => {
        service.getUsers(0, 10, 'id', 'asc', search).subscribe();

        const req = httpMock.expectOne((request) => request.url === apiUrl);

        expect(req.request.params.has('search')).toBeFalse();

        req.flush(pageResponse);
      });
    });

    it('should return an empty page when there are no users', () => {
      const emptyPage: PageResponse<UserResponse> = {
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

      let actual: PageResponse<User> | undefined;

      service.getUsers(0, 10, 'id', 'asc').subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl);
      req.flush(emptyPage);

      expect(actual).toEqual(emptyPage);
    });
  });

  describe('getUserById', () => {
    it('should send GET to the user URL and map the response', () => {
      let actual: User | undefined;

      service.getUserById(5).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(`${apiUrl}/5`);

      expect(req.request.method).toBe('GET');

      req.flush({
        ...userResponse,
        serverOnlyField: 'ignored',
      });

      expect(actual).toEqual(expectedUser);
    });

    it('should pass a 404 error to the subscriber', () => {
      let actualError: HttpErrorResponse | undefined;

      service.getUserById(999).subscribe({
        next: () => fail('Expected an error, not a successful response'),
        error: (error: HttpErrorResponse) => {
          actualError = error;
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      const errorBody = { message: 'User not found' };

      req.flush(errorBody, {
        status: 404,
        statusText: 'Not Found',
      });

      expect(actualError).toBeDefined();
      expect(actualError?.status).toBe(404);
      expect(actualError?.error).toEqual(errorBody);
    });
  });

  describe('createUser', () => {
    it('should send POST with the request body and map the response', () => {
      let actual: User | undefined;

      service.createUser(createRequest).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(apiUrl);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createRequest);

      req.flush({
        ...userResponse,
        serverOnlyField: 'ignored',
      });

      expect(actual).toEqual(expectedUser);
    });
  });

  describe('updateUser', () => {
    it('should send PUT with the updated data and map the response', () => {
      const updatedUser: User = {
        id: 5,
        firstName: 'Sara',
        lastName: 'Omar',
        username: 'sara',
        email: 'sara@example.com',
        role: UserRole.MANAGER,
        enabled: false,
      };

      let actual: User | undefined;

      service.updateUser(5, updateRequest).subscribe((result) => {
        actual = result;
      });

      const req = httpMock.expectOne(`${apiUrl}/5`);

      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);

      req.flush({
        ...updatedUser,
        serverOnlyField: 'ignored',
      });

      expect(actual).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should send DELETE to the user URL and complete successfully', () => {
      let completed = false;

      service.deleteUser(5).subscribe({
        complete: () => {
          completed = true;
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/5`);

      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toBeNull();

      req.flush(null, {
        status: 204,
        statusText: 'No Content',
      });

      expect(completed).toBeTrue();
    });
  });

  describe('changePassword', () => {
    it('should send PUT with the current and new passwords', () => {
      const request: ChangePasswordRequest = {
        currentPassword: 'OldPassword123!',
        newPassword: 'NewPassword456!',
      };

      let completed = false;

      service.changePassword(request).subscribe({
        complete: () => {
          completed = true;
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/change-password`);

      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(request);

      req.flush(null, {
        status: 204,
        statusText: 'No Content',
      });

      expect(completed).toBeTrue();
    });
  });

  describe('resetPassword', () => {
    it('should send PUT with the new password to the correct user URL', () => {
      const request: ResetPasswordRequest = {
        newPassword: 'NewPassword456!',
      };

      let completed = false;

      service.resetPassword(5, request).subscribe({
        complete: () => {
          completed = true;
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/5/reset-password`);

      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(request);

      req.flush(null, {
        status: 204,
        statusText: 'No Content',
      });

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
        name: 'getUsers',
        call: () => service.getUsers(0, 10, 'id', 'asc'),
        url: apiUrl,
        method: 'GET',
      },
      {
        name: 'getUserById',
        call: () => service.getUserById(5),
        url: `${apiUrl}/5`,
        method: 'GET',
      },
      {
        name: 'createUser',
        call: () => service.createUser(createRequest),
        url: apiUrl,
        method: 'POST',
      },
      {
        name: 'updateUser',
        call: () => service.updateUser(5, updateRequest),
        url: `${apiUrl}/5`,
        method: 'PUT',
      },
      {
        name: 'deleteUser',
        call: () => service.deleteUser(5),
        url: `${apiUrl}/5`,
        method: 'DELETE',
      },
      {
        name: 'changePassword',
        call: () =>
          service.changePassword({
            currentPassword: 'OldPassword123!',
            newPassword: 'NewPassword456!',
          }),
        url: `${apiUrl}/change-password`,
        method: 'PUT',
      },
      {
        name: 'resetPassword',
        call: () =>
          service.resetPassword(5, {
            newPassword: 'NewPassword456!',
          }),
        url: `${apiUrl}/5/reset-password`,
        method: 'PUT',
      },
    ];

    cases.forEach((testCase) => {
      it(`should propagate server errors from ${testCase.name}`, () => {
        let actualError: HttpErrorResponse | undefined;

        testCase.call().subscribe({
          next: () => fail('Expected an error, not a successful response'),
          error: (error: HttpErrorResponse) => {
            actualError = error;
          },
        });

        const req = httpMock.expectOne(
          (request) =>
            request.url === testCase.url && request.method === testCase.method,
        );

        const errorBody = { message: 'Unexpected server error' };

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
