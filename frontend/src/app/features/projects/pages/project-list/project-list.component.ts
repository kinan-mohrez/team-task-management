import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import { PageResponse } from 'src/app/core/dto/pagination/page-response.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Project } from 'src/app/models/project/project.model';

import { DeleteProjectDialogComponent } from '../../components/delete-project-dialog/delete-project-dialog.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'status',
    'actions',
  ];

  public dataSource: MatTableDataSource<Project> =
    new MatTableDataSource<Project>();

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
    private readonly projectService: ProjectService,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.isLoading = true;

    this.projectService
      .getProjects(
        this.pageIndex,
        this.pageSize,
        this.sortField,
        this.sortDirection || 'asc',
        this.searchValue,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PageResponse<Project>) => {
          this.dataSource.data = response.content;
          this.totalItems = response.totalElements;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load projects.');
        },
      });
  }

  public onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.searchValue = inputElement.value;
    this.hasActiveFilters = this.searchValue.trim().length > 0;
    this.pageIndex = 0;

    this.loadProjects();
  }

  public onRefresh(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.loadProjects();
  }

  public onClearFilters(): void {
    this.searchValue = '';
    this.hasActiveFilters = false;
    this.pageIndex = 0;

    this.loadProjects();
  }

  public onSortChange(sort: Sort): void {
    this.sortField = sort.active;
    this.sortDirection = sort.direction || 'asc';
    this.pageIndex = 0;

    this.loadProjects();
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadProjects();
  }

  public addProject(): void {
    this.router.navigate(['/projects/new']);
  }

  public deleteProject(project: Project): void {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: '420px',
      disableClose: true,
      data: project,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (confirmed: boolean) => {
          if (!confirmed) {
            return;
          }

          this.projectService
            .deleteProject(project.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.loadProjects();
                this.notificationService.showSuccess(
                  'Project deleted successfully.',
                );
              },
              error: () => {
                this.notificationService.showError('Failed to delete project.');
              },
            });
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
