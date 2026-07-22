# PROJECT_PROGRESS.md

# Team Task Management System

## Current Status

Date: 2026-07-22

---

# Project Goal

Build an Enterprise-level Team Task Management System using:

- Angular 13
- Angular Material
- Spring Boot
- Spring Security
- JWT Authentication
- PostgreSQL

Architecture requirements:

- Clean Architecture
- Modular Architecture
- Enterprise structure
- One step at a time
- No unnecessary refactoring

---

# Frontend Status

## Project Structure

Completed

- Core Module
- Shared Module
- Authentication Module
- Dashboard Module
- Users Module

Project uses:

- Angular Material
- Lazy Loading
- Feature Modules
- Services separated from Components
- Models separated in dedicated folder
- Routing per feature

---

# Authentication Module

Completed

Features:

- Login page
- Authentication service
- Route Guard
- JWT preparation
- Logout
- Protected routes

Status:

✅ Completed

---

# Dashboard Module

Completed

Features:

- Dashboard Layout
- Navigation
- Toolbar
- Sidebar

Status:

✅ Completed

---

# Users Module

Completed

Implemented Features

## User List

- Angular Material Table
- Display users
- Edit action
- Delete action
- Add user button

## User Form

Supports

- Create user
- Edit user

Using

- Reactive Forms
- Validation

## Delete Confirmation

Implemented using Angular Material Dialog.

The user must confirm before deleting.

## Notification Service

Implemented globally using Angular Material Snackbar.

Notifications available:

- User created successfully
- User updated successfully
- User deleted successfully

### Important Fix

A dependency injection problem occurred:

```
NullInjectorError:
No provider for MatSnackBar
```

Root cause:

`NotificationService` is provided in the Root Injector (`providedIn: 'root'`), while `MatSnackBarModule` was imported only inside the lazy-loaded `UsersModule`.

Solution:

Import

```ts
MatSnackBarModule
```

inside

```
AppModule
```

instead of only inside `UsersModule`.

This resolved the DI issue completely.

Another issue fixed:

The success notification after deleting a user was displayed before the delete confirmation.

Solution:

Move the success notification inside the confirmation block so it executes only after the user confirms the deletion.

Status:

✅ Completed

---

# Backend Status

Completed

## Authentication

- Spring Boot
- Spring Security
- JWT Authentication
- BCrypt Password Encoder

Status

✅ Completed

---

# Database

Completed

- PostgreSQL installed
- Database created
- Spring Boot successfully connected
- Authentication tested successfully

Status

✅ Completed

---

# Git

Repository successfully pushed to GitHub.

Latest commit includes:

- Users Module
- CRUD operations
- Delete Confirmation Dialog
- Notification Service
- Snackbar fixes
- DI fixes

Status

✅ Up to date

---

# Next Step

Next feature:

## Projects Module

Start by creating

```
features/projects
```

with routing.

This module will become the foundation for task management.

Nothing else has been started yet.

---

# Notes

Continue working exactly from this file in future conversations.

Rules:

- One step only.
- Enterprise-level quality.
- Preserve project architecture.
- Follow Clean Code principles.