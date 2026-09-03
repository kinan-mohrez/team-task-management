import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import { User } from '../../../../models/users/user.model';
import { UsersService } from '../../services/users.service';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'role',
    'enabled',
    'actions',
  ];

  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  public searchValue: string = '';
  public isLoading: boolean = false;
  public hasActiveFilters: boolean = false;

  public sortField: string = 'id';
  public sortDirection: SortDirection = 'asc';

  public totalItems: number = 0;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 50];

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.isLoading = true;

    this.usersService
      .getUsers(
        this.pageIndex,
        this.pageSize,
        this.sortField,
        this.sortDirection || 'asc',
        this.searchValue,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PageResponse<User>) => {
          this.dataSource.data = response.content;
          this.totalItems = response.totalElements;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load users.');
        },
      });
  }

  public onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.searchValue = inputElement.value;
    this.hasActiveFilters = this.searchValue.trim().length > 0;
    this.pageIndex = 0;

    this.loadUsers();
  }

  public onRefresh(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.loadUsers();
  }

  public onClearFilters(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.loadUsers();
  }

  public onSortChange(sort: Sort): void {
    this.sortField = sort.active;
    this.sortDirection = sort.direction || 'asc';
    this.pageIndex = 0;

    this.loadUsers();
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadUsers();
  }

  public addUser(): void {
    this.router.navigate(['/users/new']);
  }

  public editUser(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  public deleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '420px',
      disableClose: true,
      data: user,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.usersService
          .deleteUser(user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.loadUsers();
              this.notificationService.showSuccess(
                'User deleted successfully.',
              );
            },
            error: () => {
              this.notificationService.showError('Failed to delete user.');
            },
          });
      });
  }

  public onViewUser(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  public onToggleUserStatus(user: User): void {
    console.log('Toggle user status', user);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
