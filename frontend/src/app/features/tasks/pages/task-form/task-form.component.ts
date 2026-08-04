import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../../../models/tasks/task.model';
import { Project } from '../../../../models/project/project.model';
import { User } from '../../../../models/users/user.model';

import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../../projects/services/project.service';
import { UsersService } from '../../../users/services/users.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TaskStatus } from 'src/app/models/tasks/task-status.enum';
import { TaskPriority } from 'src/app/models/tasks/task-priority.enum';
import { Subject, takeUntil } from 'rxjs';
import { TaskMapper } from 'src/app/core/mappers/task.mapper';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  public taskForm: FormGroup;
  public isEditMode: boolean = false;
  public taskId: number | null = null;

  public statuses: TaskStatus[] = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
  ];

  public priorities: TaskPriority[] = [
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
  ];

  public projects: Project[] = [];
  public users: User[] = [];
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
    private readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      projectId: [null, Validators.required],
      assignedUserId: [null, Validators.required],
    });
  }

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
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.taskId = Number(id);
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  public saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task: Task = {
      id: this.taskId ?? 0,
      ...this.taskForm.value,
    };

    if (this.isEditMode) {
      this.taskService
        .updateTask(this.taskId!, TaskMapper.toUpdateRequest(task))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Task updated successfully.');
            this.router.navigate(['/tasks']);
          },
          error: () => {
            this.notificationService.showError('Failed to update task.');
          },
        });
    } else {
      this.taskService
        .createTask(TaskMapper.toCreateRequest(task))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Task created successfully.');
            this.router.navigate(['/tasks']);
          },
          error: () => {
            this.notificationService.showError('Failed to create task.');
          },
        });
    }
  }

  public cancel(): void {
    this.router.navigate(['/tasks']);
  }

  private loadTask(id: number): void {
    this.taskService
      .getTaskById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task: Task) => {
          this.taskForm.patchValue(task);
        },
        error: () => {
          this.notificationService.showError('Task not found.');
          this.router.navigate(['/tasks']);
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
