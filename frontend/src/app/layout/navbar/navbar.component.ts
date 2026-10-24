import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router,
  ) {}

  public logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
