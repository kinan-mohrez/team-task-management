import { TaskPriority } from './task-priority.enum';
import { TaskStatus } from './task-status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;

  projectId: number;
  projectName: string;

  assignedUserId: number;
  assignedUserName: string;
}
