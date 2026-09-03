import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CreateUserRequest } from 'src/app/core/dto/users/create-user-request.model';
import { UpdateUserRequest } from 'src/app/core/dto/users/update-user-request.model';
import { ChangePasswordRequest } from 'src/app/core/dto/users/change-password-request.model';
import { ResetPasswordRequest } from 'src/app/core/dto/users/reset-password-request.model';
import { UserResponse } from 'src/app/core/dto/users/user-response.model';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { UserMapper } from 'src/app/core/mappers/user.mapper';
import { User } from 'src/app/models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl: string = 'http://localhost:8080/api/users';

  public constructor(private readonly http: HttpClient) {}

  public getUsers(
    page: number,
    size: number,
    sortBy: string,
    sortDirection: string,
    search?: string,
  ): Observable<PageResponse<User>> {
    let params: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<PageResponse<UserResponse>>(this.apiUrl, { params })
      .pipe(
        map((response: PageResponse<UserResponse>) => ({
          ...response,
          content: UserMapper.fromResponses(response.content),
        })),
      );
  }

  public getUserById(id: number): Observable<User> {
    return this.http
      .get<UserResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((userResponse: UserResponse) =>
          UserMapper.fromResponse(userResponse),
        ),
      );
  }

  public createUser(request: CreateUserRequest): Observable<User> {
    return this.http
      .post<UserResponse>(this.apiUrl, request)
      .pipe(
        map((userResponse: UserResponse) =>
          UserMapper.fromResponse(userResponse),
        ),
      );
  }

  public updateUser(id: number, request: UpdateUserRequest): Observable<User> {
    return this.http
      .put<UserResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(
        map((userResponse: UserResponse) =>
          UserMapper.fromResponse(userResponse),
        ),
      );
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/change-password`, request);
  }

  public resetPassword(
    id: number,
    request: ResetPasswordRequest,
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reset-password`, request);
  }
}
