import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../../../../models/users/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort)
  public sort!: MatSort;
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

  private readonly destroy$ = new Subject<void>();

  public searchValue: string = '';
  public isLoading: boolean = false;
  public hasActiveFilters: boolean = false;

  public sortField: string = 'id';
  public sortDirection: SortDirection = 'asc';

  public totalItems: number = 0;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 50];

  public constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public loadUsers(): void {
    this.isLoading = true;

    this.usersService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users: User[]) => {
          this.dataSource.data = users;
          this.totalItems = users.length;

          this.dataSource.filterPredicate = (
            user: User,
            filter: string,
          ): boolean => {
            const search = filter.trim().toLowerCase();

            return (
              user.firstName.toLowerCase().includes(search) ||
              user.lastName.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search) ||
              user.role.toLowerCase().includes(search)
            );
          };

          this.isLoading = false;
        },
      });
  }

  public onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.searchValue = inputElement.value;
    this.hasActiveFilters = this.searchValue.trim().length > 0;

    this.dataSource.filter = this.searchValue.trim().toLowerCase();

    this.pageIndex = 0;
  }

  public onRefresh(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.dataSource.filter = '';

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

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }

      this.usersService
        .deleteUser(user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadUsers();
            this.notificationService.showSuccess('User deleted successfully.');
          },
          error: () => {
            this.notificationService.showError('Failed to delete user.');
          },
        });
    });
  }

  public onClearFilters(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.dataSource.filter = '';
  }

  public onSortChange(sort: Sort): void {
    this.sortField = sort.active;
    this.sortDirection = sort.direction;
    this.pageIndex = 0;
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
