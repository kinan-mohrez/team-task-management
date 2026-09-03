package com.kinan.taskmanagement.task.dto;

public record DashboardStatisticsResponse(
        long totalTasks,
        long inProgressTasks,
        long completedTasks,
        long overdueTasks
) {
}