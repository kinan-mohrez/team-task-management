import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/auth/login-request.model';
import { LoginResponse } from '../models/auth/login-response.model';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}${API_ENDPOINTS.auth.base}`;

  constructor(private http: HttpClient) {}

  public login(request: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}${API_ENDPOINTS.auth.login}`,
      request,
    );
  }
}
