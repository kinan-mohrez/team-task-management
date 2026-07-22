package com.kinan.taskmanagement.auth.dto;

public record RegisterRequest(
        String username,
        String password
) {
}
