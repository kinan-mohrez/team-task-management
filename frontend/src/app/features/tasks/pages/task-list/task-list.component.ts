import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public displayedColumns: string[] = [
    'title',
    'project',
    'assignedUser',
    'status',
    'priority',
    'dueDate',
    'actions',
  ];

  public tasks: Task[] = [];
  public projects: Project[] = [];
  public users: User[] = [];

  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.users = this.usersService.getUsers();

    this.loadTasks();
  }

  public loadTasks(): void {
    this.tasks = this.taskService.getTasks();
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

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }

      this.taskService.deleteTask(task.id);
      this.loadTasks();

      this.notificationService.showSuccess('Task deleted successfully.');
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
}
