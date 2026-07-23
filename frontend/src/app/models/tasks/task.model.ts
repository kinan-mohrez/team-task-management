import { TaskStatus } from "./task-status.enum";
import { TaskPriority } from './task-priority.enum';



export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  projectId: number;
  assignedUserId: number;
}
