import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginRequest } from 'src/app/core/models/auth/login-request.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hidePassword = true;
  public isLoading = false;

  public loginRequest: LoginRequest = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {}

  public login(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.isLoading = false;

        this.snackBar.open('Invalid username or password.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
