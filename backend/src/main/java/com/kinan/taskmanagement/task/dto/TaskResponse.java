package com.kinan.taskmanagement.task.dto;

import com.kinan.taskmanagement.task.enums.TaskPriority;
import com.kinan.taskmanagement.task.enums.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private LocalDate dueDate;

    private Long projectId;

    private String projectName;

    private Long assignedUserId;

    private String assignedUserName;

}