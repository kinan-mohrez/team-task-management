package com.kinan.taskmanagement.project.repository;

import com.kinan.taskmanagement.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    boolean existsByName(String name);

    Page<Project> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name,
            String description,
            Pageable pageable
    );

}