package com.kinan.taskmanagement.user.controller;

import com.kinan.taskmanagement.user.dto.ChangePasswordRequest;
import com.kinan.taskmanagement.user.dto.CreateUserRequest;
import com.kinan.taskmanagement.user.dto.ResetPasswordRequest;
import com.kinan.taskmanagement.user.dto.UpdateUserRequest;
import com.kinan.taskmanagement.user.dto.UserResponse;
import com.kinan.taskmanagement.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
        name = "Users",
        description = "User management endpoints"
)
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Page<UserResponse> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String search
    ) {

        return this.userService.getAllUsers(
                page,
                size,
                sortBy,
                sortDirection,
                search
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public UserResponse getUserById(@PathVariable Long id) {

        return this.userService.getUserById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createUser(
            @Valid @RequestBody CreateUserRequest request
    ) {

        return this.userService.createUser(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ) {

        return this.userService.updateUser(id, request);
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request
    ) {

        this.userService.changePassword(
                authentication.getName(),
                request
        );

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id
    ) {

        this.userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> resetPassword(
            @PathVariable Long id,
            @Valid @RequestBody ResetPasswordRequest request
    ) {

        this.userService.resetPassword(id, request);

        return ResponseEntity.noContent().build();
    }
}