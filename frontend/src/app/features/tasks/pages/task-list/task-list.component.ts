import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { Project } from '../../../../models/project/project.model';
import { Task } from '../../../../models/tasks/task.model';
import { User } from '../../../../models/users/user.model';

import { ProjectService } from '../../../projects/services/project.service';
import { UsersService } from '../../../users/services/users.service';
import { DeleteTaskDialogComponent } from '../../components/delete-task-dialog/delete-task-dialog.component';
import { TaskService } from '../../services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

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

  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects: Project[]) => {
          this.projects = projects;
        },
        error: () => {
          this.notificationService.showError('Failed to load projects.');
        },
      });

    this.usersService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
        error: () => {
          this.notificationService.showError('Failed to load users.');
        },
      });

    this.loadTasks();
  }

  public loadTasks(): void {
    this.isLoading = true;

    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks: Task[]) => {
          this.dataSource.data = tasks;
          this.totalItems = tasks.length;
          this.isLoading = false;
        },
        error: () => {
          this.notificationService.showError('Failed to load tasks.');
          this.isLoading = false;
        },
      });
  }

  public addTask(): void {
    this.router.navigate(['/tasks/new']);
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

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (task: Task, filter: string): boolean => {
      const searchText = filter.trim().toLowerCase();

      return (
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText) ||
        task.status.toLowerCase().includes(searchText) ||
        task.priority.toLowerCase().includes(searchText) ||
        this.getProjectName(task.projectId)
          .toLowerCase()
          .includes(searchText) ||
        this.getAssignedUserName(task.assignedUserId)
          .toLowerCase()
          .includes(searchText)
      );
    };
  }

  public applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    this.hasActiveFilters = this.searchValue.trim().length > 0;
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
