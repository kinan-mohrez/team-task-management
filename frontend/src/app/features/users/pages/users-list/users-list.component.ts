import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../../../../models/users/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
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
    const users = this.usersService.getUsers();

    this.dataSource.data = users;
    this.totalItems = users.length;
  }
  public onSearch(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    this.searchValue = inputElement.value.trim();
    this.hasActiveFilters = this.searchValue.length > 0;
    this.pageIndex = 0;
  }

  public onRefresh(): void {
    this.pageIndex = 0;
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
      this.usersService.deleteUser(user.id);
      this.loadUsers();
      this.notificationService.showSuccess('User deleted successfully.');
    });
  }

  public onClearFilters(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;
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

  public onAddUser(): void {
    console.log('Add user');
  }

  public onViewUser(user: User): void {
    console.log('View user', user);
  }

  public onEditUser(user: User): void {
    console.log('Edit user', user);
  }

  public onToggleUserStatus(user: User): void {
    console.log('Toggle user status', user);
  }

  public onDeleteUser(user: User): void {
    console.log('Delete user', user);
  }
}
