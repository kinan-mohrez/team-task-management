import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Task } from 'src/app/models/tasks/task.model';

import { DeleteTaskDialogComponent } from '../../components/delete-task-dialog/delete-task-dialog.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  public task!: Task;

  public isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly taskService: TaskService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.loadTask();
  }

  private loadTask(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/tasks']);
      return;
    }

    this.isLoading = true;

    this.taskService
      .getTaskById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task: Task) => {
          this.task = task;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load task.');
          this.router.navigate(['/tasks']);
        },
      });
  }

  public goBack(): void {
    this.router.navigate(['/tasks']);
  }

  public editTask(): void {
    this.router.navigate(['/tasks', this.task.id, 'edit']);
  }

  public deleteTask(): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '420px',
      disableClose: true,
      data: this.task,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.taskService
          .deleteTask(this.task.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Task deleted successfully.',
              );

              this.router.navigate(['/tasks']);
            },
            error: () => {
              this.notificationService.showError('Failed to delete task.');
            },
          });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
