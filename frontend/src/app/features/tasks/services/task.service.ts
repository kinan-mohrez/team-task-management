import { Injectable } from '@angular/core';

import { Task } from '../../../models/tasks/task.model';
import { TaskPriority } from 'src/app/models/tasks/task-priority.enum';
import { TaskStatus } from 'src/app/models/tasks/task-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Design project dashboard',
      description: 'Create the initial dashboard design and layout.',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: '2026-08-05',
      projectId: 1,
      assignedUserId: 1,
    },
    {
      id: 2,
      title: 'Implement authentication',
      description: 'Connect the frontend authentication flow to the backend.',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: '2026-08-10',
      projectId: 1,
      assignedUserId: 2,
    },
  ];

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public getTaskById(id: number): Task | undefined {
    return this.tasks.find((task: Task) => task.id === id);
  }

  public createTask(task: Task): void {
    const newId: number =
      this.tasks.length > 0
        ? Math.max(...this.tasks.map((item: Task) => item.id)) + 1
        : 1;

    this.tasks.push({
      ...task,
      id: newId,
    });
  }

  public updateTask(updatedTask: Task): void {
    const taskIndex: number = this.tasks.findIndex(
      (task: Task) => task.id === updatedTask.id,
    );

    if (taskIndex === -1) {
      return;
    }

    this.tasks[taskIndex] = {
      ...updatedTask,
    };
  }

  public deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }
}
