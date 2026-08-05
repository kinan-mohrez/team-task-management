package com.kinan.taskmanagement.team.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTeamRequest {

    @NotBlank
    private String name;

    private String description;

}