import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey = 'access_token';

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}
