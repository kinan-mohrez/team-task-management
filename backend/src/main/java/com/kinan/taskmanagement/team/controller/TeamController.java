package com.kinan.taskmanagement.team.controller;

import com.kinan.taskmanagement.team.dto.CreateTeamRequest;
import com.kinan.taskmanagement.team.dto.TeamResponse;
import com.kinan.taskmanagement.team.dto.UpdateTeamRequest;
import com.kinan.taskmanagement.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
@Tag(name = "Teams", description = "Team management APIs")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    @Operation(summary = "Get all teams")
    public Page<TeamResponse> getAllTeams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String search
    ) {

        return this.teamService.getAllTeams(
                page,
                size,
                sortBy,
                sortDirection,
                search
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get team by id")
    public TeamResponse getTeamById(@PathVariable Long id) {

        return teamService.getTeamById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new team")
    public TeamResponse createTeam(
            @Valid @RequestBody CreateTeamRequest request
    ) {

        return teamService.createTeam(request);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a team")
    public TeamResponse updateTeam(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTeamRequest request
    ) {

        return teamService.updateTeam(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete a team")
    public void deleteTeam(@PathVariable Long id) {

        teamService.deleteTeam(id);
    }
}