import { TaskPriority } from 'src/app/models/tasks/task-priority.enum';
import { TaskStatus } from 'src/app/models/tasks/task-status.enum';

export class UpdateTaskRequest {
  public title!: string;
  public description!: string;
  public status!: TaskStatus;
  public priority!: TaskPriority;
  public dueDate!: string;
  public projectId!: number;
  public assignedUserId!: number;
}
