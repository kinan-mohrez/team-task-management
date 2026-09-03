package com.kinan.taskmanagement.project.service;

import com.kinan.taskmanagement.exception.DuplicateResourceException;
import com.kinan.taskmanagement.exception.ResourceNotFoundException;
import com.kinan.taskmanagement.project.dto.CreateProjectRequest;
import com.kinan.taskmanagement.project.dto.ProjectResponse;
import com.kinan.taskmanagement.project.entity.Project;
import com.kinan.taskmanagement.project.mapper.ProjectMapper;
import com.kinan.taskmanagement.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import com.kinan.taskmanagement.project.dto.UpdateProjectRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    public Page<ProjectResponse> getAllProjects(
            int page,
            int size,
            String sortBy,
            String sortDirection,
            String search
    ) {

        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        if (search == null || search.isBlank()) {
            return this.projectRepository.findAll(pageable)
                    .map(this.projectMapper::toResponse);
        }

        return this.projectRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        search,
                        search,
                        pageable
                )
                .map(this.projectMapper::toResponse);
    }

    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with id: " + id));

        return projectMapper.toResponse(project);
    }

    public ProjectResponse createProject(CreateProjectRequest request) {

        if (projectRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException(
                    "Project with name '" + request.getName() + "' already exists.");
        }

        Project project = projectMapper.toEntity(request);

        Project savedProject = projectRepository.save(project);

        return projectMapper.toResponse(savedProject);
    }

    public ProjectResponse updateProject(Long id, UpdateProjectRequest request) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with id: " + id));

        if (!project.getName().equals(request.getName())
                && projectRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException(
                    "Project with name '" + request.getName() + "' already exists.");
        }

        projectMapper.updateEntity(project, request);

        Project updatedProject = projectRepository.save(project);

        return projectMapper.toResponse(updatedProject);
    }

    public void deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with id: " + id));

        projectRepository.delete(project);
    }

}