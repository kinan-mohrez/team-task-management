import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
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
    this.projects = this.projectService.getProjects();
    this.users = this.usersService.getUsers();

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
      this.taskService.updateTask(task);
      this.notificationService.showSuccess('Task updated successfully.');
    } else {
      this.taskService.createTask(task);
      this.notificationService.showSuccess('Task created successfully.');
    }

    this.router.navigate(['/tasks']);
  }

  public cancel(): void {
    this.router.navigate(['/tasks']);
  }

  private loadTask(id: number): void {
    const task: Task | undefined = this.taskService.getTaskById(id);

    if (!task) {
      this.router.navigate(['/tasks']);
      return;
    }

    this.taskForm.patchValue(task);
  }
}
