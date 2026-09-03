package com.kinan.taskmanagement.task.repository;

import com.kinan.taskmanagement.task.entity.Task;
import com.kinan.taskmanagement.task.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title,
            String description,
            Pageable pageable
    );

    long countByAssignedUserUsername(String username);

    long countByAssignedUserUsernameAndStatus(
            String username,
            TaskStatus status
    );

    long countByAssignedUserUsernameAndDueDateBeforeAndStatusNot(
            String username,
            LocalDate dueDate,
            TaskStatus status
    );
}