import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.endsWith(
        `${API_ENDPOINTS.auth.base}${API_ENDPOINTS.auth.login}`,
      )
    ) {
      return next.handle(request);
    }
    const token = this.tokenService.getToken();

    if (!token) {
      return next.handle(request);
    }
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(authRequest)
  }
}
