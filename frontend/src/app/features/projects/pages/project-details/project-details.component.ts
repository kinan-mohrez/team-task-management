import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Project } from 'src/app/models/project/project.model';

import { DeleteProjectDialogComponent } from '../../components/delete-project-dialog/delete-project-dialog.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  public project!: Project;

  public isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.loadProject();
  }

  private loadProject(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/projects']);
      return;
    }

    this.isLoading = true;

    this.projectService
      .getProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project: Project) => {
          this.project = project;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load project.');
          this.router.navigate(['/projects']);
        },
      });
  }

  public goBack(): void {
    this.router.navigate(['/projects']);
  }

  public editProject(): void {
    this.router.navigate(['/projects', this.project.id, 'edit']);
  }

  public deleteProject(): void {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: '420px',
      disableClose: true,
      data: this.project,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.projectService
          .deleteProject(this.project.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Project deleted successfully.',
              );

              this.router.navigate(['/projects']);
            },
            error: () => {
              this.notificationService.showError('Failed to delete project.');
            },
          });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
