package com.kinan.taskmanagement.project.dto;

import com.kinan.taskmanagement.project.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
public class UpdateProjectRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 1000)
    private String description;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @NotNull
    private ProjectStatus status;

}