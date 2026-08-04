package com.kinan.taskmanagement.task.mapper;

import com.kinan.taskmanagement.task.dto.CreateTaskRequest;
import com.kinan.taskmanagement.task.dto.TaskResponse;
import com.kinan.taskmanagement.task.dto.UpdateTaskRequest;
import com.kinan.taskmanagement.task.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskResponse toResponse(Task task) {

        TaskResponse response = new TaskResponse();

        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus());
        response.setPriority(task.getPriority());
        response.setDueDate(task.getDueDate());

        response.setProjectId(task.getProject().getId());
        response.setProjectName(task.getProject().getName());

        response.setAssignedUserId(task.getAssignedUser().getId());
        response.setAssignedUserName(
                task.getAssignedUser().getFirstName() + " " + task.getAssignedUser().getLastName()
        );

        return response;
    }

    public void updateEntity(Task task, UpdateTaskRequest request) {

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

    }

}