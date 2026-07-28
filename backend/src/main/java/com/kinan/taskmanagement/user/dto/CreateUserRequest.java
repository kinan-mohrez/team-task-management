package com.kinan.taskmanagement.user.dto;

import com.kinan.taskmanagement.common.validation.ValidationConstants;
import com.kinan.taskmanagement.user.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Username is required")
    @Size(
            min = ValidationConstants.USERNAME_MIN_LENGTH,
            max = ValidationConstants.USERNAME_MAX_LENGTH,
            message = "Username must be between 3 and 50 characters"
    )
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(
            min = ValidationConstants.PASSWORD_MIN_LENGTH,
            message = "Password must be at least 8 characters"
    )
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;

    private boolean enabled;
}