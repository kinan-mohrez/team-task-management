package com.kinan.taskmanagement.task.service;

import com.kinan.taskmanagement.exception.ResourceNotFoundException;
import com.kinan.taskmanagement.project.entity.Project;
import com.kinan.taskmanagement.project.repository.ProjectRepository;
import com.kinan.taskmanagement.task.dto.CreateTaskRequest;
import com.kinan.taskmanagement.task.dto.TaskResponse;
import com.kinan.taskmanagement.task.dto.UpdateTaskRequest;
import com.kinan.taskmanagement.task.entity.Task;
import com.kinan.taskmanagement.task.mapper.TaskMapper;
import com.kinan.taskmanagement.task.repository.TaskRepository;
import com.kinan.taskmanagement.user.entity.User;
import com.kinan.taskmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    public Page<TaskResponse> getAllTasks(
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
            return this.taskRepository.findAll(pageable)
                    .map(this.taskMapper::toResponse);
        }

        return this.taskRepository
                .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        search,
                        search,
                        pageable
                )
                .map(this.taskMapper::toResponse);
    }

    public TaskResponse getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found.")
                );

        return taskMapper.toResponse(task);
    }

    public TaskResponse createTask(CreateTaskRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found.")
                );

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setProject(project);
        task.setAssignedUser(assignedUser);

        return taskMapper.toResponse(
                taskRepository.save(task)
        );
    }

    public TaskResponse updateTask(
            Long id,
            UpdateTaskRequest request
    ) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found.")
                );

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found.")
                );

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );

        taskMapper.updateEntity(task, request);

        task.setProject(project);
        task.setAssignedUser(assignedUser);

        return taskMapper.toResponse(
                taskRepository.save(task)
        );
    }

    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found.")
                );

        taskRepository.delete(task);
    }
}