package com.kinan.taskmanagement.task.dto;

import com.kinan.taskmanagement.task.enums.TaskPriority;
import com.kinan.taskmanagement.task.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateTaskRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private TaskStatus status;

    @NotNull
    private TaskPriority priority;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private Long projectId;

    @NotNull
    private Long assignedUserId;

}