import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Project } from 'src/app/models/project/project.model';

import { DeleteProjectDialogComponent } from '../../components/delete-project-dialog/delete-project-dialog.component';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

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
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects: Project[]) => {
          this.dataSource.data = projects;
        },
        error: () => {
          this.notificationService.showError('Failed to load projects.');
        },
      });
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
