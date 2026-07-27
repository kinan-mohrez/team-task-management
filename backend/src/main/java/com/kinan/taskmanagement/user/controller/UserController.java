package com.kinan.taskmanagement.user.controller;

import com.kinan.taskmanagement.user.dto.CreateUserRequest;
import com.kinan.taskmanagement.user.dto.UserResponse;
import com.kinan.taskmanagement.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserResponse createUser(@Valid @RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/test")
    public String test() {
        return "Protected endpoint works";
    }
}