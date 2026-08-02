import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'src/app/core/services/notification.service';
import { User } from 'src/app/models/users/user.model';

import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user!: User;

  public isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/users']);
      return;
    }

    this.isLoading = true;

    this.usersService
      .getUserById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.user = user;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load user.');
          this.router.navigate(['/users']);
        },
      });
  }

  public goBack(): void {
    this.router.navigate(['/users']);
  }

  public editUser(): void {
    this.router.navigate(['/users', this.user.id, 'edit']);
  }

  public deleteUser(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '420px',
      disableClose: true,
      data: this.user,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.usersService
          .deleteUser(this.user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'User deleted successfully.',
              );

              this.router.navigate(['/users']);
            },
            error: () => {
              this.notificationService.showError('Failed to delete user.');
            },
          });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
