package com.kinan.taskmanagement.dashboard.controller;

import com.kinan.taskmanagement.task.dto.DashboardStatisticsResponse;
import com.kinan.taskmanagement.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "Dashboard",
        description = "Dashboard endpoints"
)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final TaskService taskService;

    public DashboardController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(
            summary = "Get dashboard statistics",
            description = "Returns task statistics for the authenticated user"
    )
    @GetMapping("/statistics")
    public DashboardStatisticsResponse getStatistics(
            Authentication authentication
    ) {
        return taskService.getDashboardStatistics(
                authentication.getName()
        );
    }
}