package com.kinan.taskmanagement.project.controller;

import com.kinan.taskmanagement.project.dto.CreateProjectRequest;
import com.kinan.taskmanagement.project.dto.ProjectResponse;
import com.kinan.taskmanagement.project.dto.UpdateProjectRequest;
import com.kinan.taskmanagement.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Projects",
        description = "Project management API"
)
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Operation(summary = "Get all projects")
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Page<ProjectResponse> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String search
    ) {

        return this.projectService.getAllProjects(
                page,
                size,
                sortBy,
                sortDirection,
                search
        );
    }

    @Operation(summary = "Get project by id")
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProjectResponse getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @Operation(summary = "Create project")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProjectResponse createProject(
            @Valid @RequestBody CreateProjectRequest request
    ) {

        return projectService.createProject(request);
    }

    @Operation(summary = "Update project")
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProjectRequest request
    ) {

        return projectService.updateProject(id, request);
    }

    @Operation(summary = "Delete project")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}