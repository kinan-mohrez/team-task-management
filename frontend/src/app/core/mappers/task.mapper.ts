import { CreateTaskRequest } from '../dto/tasks/create-task-request.model';
import { TaskResponse } from '../dto/tasks/task-response.model';
import { UpdateTaskRequest } from '../dto/tasks/update-task-request.model';
import { Task } from 'src/app/models/tasks/task.model';

export class TaskMapper {
  public static fromResponses(taskResponses: TaskResponse[]): Task[] {
    return taskResponses.map((taskResponse: TaskResponse) =>
      this.fromResponse(taskResponse),
    );
  }

  public static fromResponse(taskResponse: TaskResponse): Task {
    return {
      id: taskResponse.id,
      title: taskResponse.title,
      description: taskResponse.description,
      status: taskResponse.status,
      priority: taskResponse.priority,
      dueDate: taskResponse.dueDate,
      projectId: taskResponse.projectId,
      assignedUserId: taskResponse.assignedUserId,
    };
  }

  public static toCreateRequest(task: Task): CreateTaskRequest {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      projectId: task.projectId,
      assignedUserId: task.assignedUserId,
    };
  }

  public static toUpdateRequest(task: Task): UpdateTaskRequest {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      projectId: task.projectId,
      assignedUserId: task.assignedUserId,
    };
  }
}
