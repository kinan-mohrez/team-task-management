package com.kinan.taskmanagement.user.service;

import com.kinan.taskmanagement.exception.DuplicateResourceException;
import com.kinan.taskmanagement.exception.InvalidPasswordException;
import com.kinan.taskmanagement.exception.ResourceNotFoundException;
import com.kinan.taskmanagement.user.dto.*;
import com.kinan.taskmanagement.user.entity.User;
import com.kinan.taskmanagement.user.mapper.UserMapper;
import com.kinan.taskmanagement.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByUsername(String username) {

        return this.userRepository.findByUsername(username);
    }

    public User register(User user) {

        if (this.userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new DuplicateResourceException(
                    "Username '" + user.getUsername() + "' already exists"
            );
        }

        user.setPassword(
                this.passwordEncoder.encode(user.getPassword())
        );

        return this.userRepository.save(user);
    }

    public Page<UserResponse> getAllUsers(
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
            return this.userRepository.findAll(pageable)
                    .map(UserMapper::toResponse);
        }

        return this.userRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        search,
                        search,
                        search,
                        search,
                        pageable
                )
                .map(UserMapper::toResponse);
    }

    public UserResponse createUser(CreateUserRequest request) {

        if (this.userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException(
                    "Username '" + request.getUsername() + "' already exists"
            );
        }

        if (this.userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Email '" + request.getEmail() + "' already exists"
            );
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(
                this.passwordEncoder.encode(request.getPassword())
        );
        user.setRole(request.getRole());
        user.setEnabled(request.isEnabled());

        User savedUser = this.userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }

    public User findById(Long id) {

        return this.userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User with id " + id + " was not found"
                        )
                );
    }

    public UserResponse getUserById(Long id) {

        return UserMapper.toResponse(
                this.findById(id)
        );
    }

    public UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    ) {

        User user = this.findById(id);

        if (!user.getUsername().equals(request.getUsername())
                && this.userRepository.existsByUsername(
                request.getUsername())) {

            throw new DuplicateResourceException(
                    "Username '" + request.getUsername() + "' already exists"
            );
        }

        if (!user.getEmail().equals(request.getEmail())
                && this.userRepository.existsByEmail(
                request.getEmail())) {

            throw new DuplicateResourceException(
                    "Email '" + request.getEmail() + "' already exists"
            );
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setEnabled(request.isEnabled());

        User updatedUser = this.userRepository.save(user);

        return UserMapper.toResponse(updatedUser);
    }

    public void deleteUser(Long id) {

        User user = this.findById(id);

        this.userRepository.delete(user);
    }

    public void changePassword(
            String username,
            ChangePasswordRequest request
    ) {

        User user = this.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with username: " + username
                        )
                );

        if (!this.passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new InvalidPasswordException(
                    "Current password is incorrect"
            );
        }

        if (this.passwordEncoder.matches(
                request.getNewPassword(),
                user.getPassword())) {

            throw new InvalidPasswordException(
                    "New password must be different from the current password"
            );
        }

        user.setPassword(
                this.passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        user.setMustChangePassword(false);

        this.userRepository.save(user);
    }

    public void resetPassword(
            Long id,
            ResetPasswordRequest request
    ) {

        User user = this.findById(id);

        if (this.passwordEncoder.matches(
                request.getNewPassword(),
                user.getPassword())) {

            throw new InvalidPasswordException(
                    "New password must be different from the current password"
            );
        }

        user.setPassword(
                this.passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        user.setMustChangePassword(true);

        this.userRepository.save(user);
    }
}