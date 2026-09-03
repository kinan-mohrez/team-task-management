import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PageResponse } from '../../../../core/dto/pagination/page-response.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { Project } from '../../../../models/project/project.model';
import { Task } from '../../../../models/tasks/task.model';
import { User } from '../../../../models/users/user.model';

import { ProjectService } from '../../../projects/services/project.service';
import { UsersService } from '../../../users/services/users.service';
import { DeleteTaskDialogComponent } from '../../components/delete-task-dialog/delete-task-dialog.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'title',
    'project',
    'assignedUser',
    'status',
    'priority',
    'dueDate',
    'actions',
  ];

  public dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  public searchValue: string = '';
  public isLoading: boolean = false;
  public hasActiveFilters: boolean = false;

  public sortField: string = 'title';
  public sortDirection: SortDirection = 'asc';

  public totalItems: number = 0;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 50];

  public projects: Project[] = [];
  public users: User[] = [];

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
    this.loadTasks();
  }

  public loadTasks(): void {
    this.isLoading = true;

    this.taskService
      .getTasks(
        this.pageIndex,
        this.pageSize,
        this.sortField,
        this.sortDirection || 'asc',
        this.searchValue,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PageResponse<Task>) => {
          this.dataSource.data = response.content;
          this.totalItems = response.totalElements;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load tasks.');
        },
      });
  }

  private loadProjects(): void {
    this.projectService
      .getProjects(0, 1000, 'name', 'asc')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PageResponse<Project>) => {
          this.projects = response.content;
        },
        error: () => {
          this.notificationService.showError('Failed to load projects.');
        },
      });
  }

  private loadUsers(): void {
    this.usersService
      .getUsers(0, 1000, 'firstName', 'asc')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PageResponse<User>) => {
          this.users = response.content;
        },
        error: () => {
          this.notificationService.showError('Failed to load users.');
        },
      });
  }

  public applyFilter(): void {
    this.hasActiveFilters = this.searchValue.trim().length > 0;

    this.pageIndex = 0;

    this.loadTasks();
  }

  public onClearFilters(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.loadTasks();
  }

  public onRefresh(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.loadTasks();
  }

  public onSortChange(sort: Sort): void {
    this.sortField = sort.active;
    this.sortDirection = sort.direction || 'asc';
    this.pageIndex = 0;

    this.loadTasks();
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadTasks();
  }

  public addTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  public viewTask(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  public editTask(task: Task): void {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  public deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '400px',
      data: task,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.taskService
          .deleteTask(task.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.loadTasks();

              this.notificationService.showSuccess(
                'Task deleted successfully.',
              );
            },
            error: () => {
              this.notificationService.showError('Failed to delete task.');
            },
          });
      });
  }

  public getProjectName(projectId: number): string {
    const project: Project | undefined = this.projects.find(
      (currentProject: Project) => currentProject.id === projectId,
    );

    return project?.name ?? 'Unknown project';
  }

  public getAssignedUserName(userId: number): string {
    const user: User | undefined = this.users.find(
      (currentUser: User) => currentUser.id === userId,
    );

    return user ? `${user.firstName} ${user.lastName}` : 'Unassigned';
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
