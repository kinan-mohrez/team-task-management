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

import java.util.List;

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

    public List<ProjectResponse> getAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(projectMapper::toResponse)
                .toList();
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