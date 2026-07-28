package com.kinan.taskmanagement.user.dto;

import com.kinan.taskmanagement.common.validation.ValidationConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChangePasswordRequest {

    @NotBlank(message = "Current password is required")
    private String currentPassword;

    @NotBlank(message = "New password is required")
    @Size(
            min = ValidationConstants.PASSWORD_MIN_LENGTH,
            message = "Password must be at least 8 characters"
    )
    private String newPassword;
}