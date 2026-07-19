import { Component, OnInit } from '@angular/core';
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
  loginRequest: LoginRequest = {
    username: '',
    password: '',
  };
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
