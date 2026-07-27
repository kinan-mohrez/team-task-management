# Team Task Management System — Project Progress

**Last Updated:** 2026-07-27

---

## Project Goal

Build an enterprise-style Team Task Management System using:

- Angular 13
- Angular Material
- Spring Boot
- Spring Security
- JWT Authentication
- PostgreSQL
- Hibernate / JPA

The project follows:

- Modular Architecture
- Clean Architecture
- Clean Code
- Separation of Concerns
- Feature-based Structure
- Reusable Services and Components
- Lazy-loaded Angular modules
- DTO-based API communication
- Secure stateless authentication

---

## Current Status

### Frontend

Completed modules:

- Authentication Module
- Dashboard Module
- Users Module
- Projects Module
- Tasks Module

The Users, Projects, and Tasks modules currently use in-memory services and are not yet connected to their backend APIs.

### Backend

Completed:

- Spring Boot project setup
- Spring Security configuration
- Stateless JWT authentication
- Login endpoint
- BCrypt password encoding
- PostgreSQL integration
- Hibernate / JPA configuration
- User domain foundation
- User creation endpoint
- Protected user-list endpoint
- DTO and mapper structure
- End-to-end authentication testing

---

## Frontend Architecture

```text
src/app
│
├── core
│   └── services
│       └── notification.service.ts
│
├── shared
│
├── layout
│
├── models
│   ├── dashboard
│   ├── project
│   ├── tasks
│   └── users
│
└── features
    ├── auth
    ├── dashboard
    ├── users
    ├── projects
    └── tasks
```

The frontend uses:

- Angular feature modules
- Lazy-loaded routing
- Reactive Forms
- Angular Material
- Services separated from components
- Models stored in dedicated folders
- Shared global notification service
- Confirmation dialogs for destructive actions

---

## Authentication Module

Implemented:

- Login page
- Reactive Form validation
- Authentication service
- JWT token storage
- Route Guard
- HTTP Interceptor
- Protected routes
- Logout functionality

**Status:** ✅ Completed

---

## Dashboard Module

Implemented:

- Main dashboard page
- Statistics cards
- Recent tasks table
- Upcoming deadlines
- Dashboard service
- Dedicated dashboard models
- Navigation layout
- Sidebar
- Toolbar

**Status:** ✅ Completed

---

## Users Frontend Module

Implemented:

- User list
- Angular Material table
- Create user
- Edit user
- Delete user
- Delete confirmation dialog
- Reactive Form validation
- Success notifications
- In-memory user service

User fields:

- ID
- First name
- Last name
- Email
- Role
- Enabled status

**Status:** ✅ Frontend CRUD completed with in-memory data

---

## Projects Module

Implemented:

- Project list
- Angular Material table
- Create project
- Edit project
- Delete project
- Delete confirmation dialog
- Reactive Form validation
- Success notifications
- In-memory project service

Project fields:

- ID
- Name
- Description
- Start date
- End date
- Status

**Status:** ✅ Frontend CRUD completed with in-memory data

---

## Tasks Module

Implemented:

- Lazy-loaded Tasks Module
- Task list
- Angular Material table
- Create task
- Edit task
- Delete task
- Delete confirmation dialog
- Reactive Form validation
- Success notifications
- In-memory task service

Task fields:

- ID
- Title
- Description
- Status
- Priority
- Due date
- Project
- Assigned user

Additional implementation details:

- Project selection uses data from `ProjectService`.
- Assigned-user selection uses data from `UsersService`.
- Project and assigned-user names are displayed in the task table.
- Task status uses `TaskStatus`.
- Task priority uses `TaskPriority`.
- The task model uses strongly typed enums.
- Delete notifications appear only after confirmation.

**Status:** ✅ Frontend CRUD completed with in-memory data

---

## Global Notification Service

Implemented using Angular Material Snackbar.

Available methods:

```ts
showSuccess(message: string): void
showError(message: string): void
showInfo(message: string): void
showWarning(message: string): void
```

`MatSnackBarModule` is imported in `AppModule` because `NotificationService` is provided through the root injector.

This prevents the following dependency-injection error:

```text
NullInjectorError: No provider for MatSnackBar
```

**Status:** ✅ Completed

---

## Backend Architecture

The backend uses feature-oriented packages and separates responsibilities between:

- Controllers
- Services
- Repositories
- Entities
- DTOs
- Mappers
- Security filters
- Configuration
- Exception handling

Current backend packages include:

```text
com.kinan.taskmanagement
│
├── auth
├── common
├── config
├── exception
└── user
```

---

## Authentication Backend

Implemented:

- Spring Security
- Stateless session management
- JWT generation
- JWT validation
- JWT authentication filter
- BCrypt password verification
- Public authentication endpoint
- Protected application endpoints

Authentication endpoint:

```http
POST /api/auth/login
```

Tested successfully with a valid username and password.

The response returns a JWT token that can be used as:

```http
Authorization: Bearer <token>
```

**Status:** ✅ Completed and tested

---

## Users Backend Foundation

Implemented:

- `User` JPA entity
- `UserRepository`
- `UserService`
- `UserController`
- `UserMapper`
- `UserResponse`
- `CreateUserRequest`
- `UpdateUserRequest`
- BCrypt password encoding
- Username uniqueness validation
- Email uniqueness validation
- PostgreSQL persistence

Current user fields:

- ID
- First name
- Last name
- Username
- Email
- Password
- Role
- Enabled status

Implemented and tested endpoints:

```http
POST /api/users
GET /api/users
```

Test flow completed successfully:

1. Temporarily allowed `POST /api/users` to create the initial administrator through Postman.
2. Created the administrator and persisted it in PostgreSQL.
3. Logged in through `/api/auth/login`.
4. Received a valid JWT token.
5. Used the token to access the protected `/api/users` endpoint.
6. Confirmed that the user list was returned successfully.
7. Removed the temporary public access rule from `SecurityConfig`.
8. Confirmed that user endpoints are protected again.

Current security configuration:

```java
.requestMatchers("/api/auth/**").permitAll()
.anyRequest().authenticated()
```

This means that only authentication endpoints are public. User endpoints require a valid JWT.

**Status:** 🚧 Backend foundation completed; full CRUD still in progress

---

## Database Status

Implemented and verified:

- PostgreSQL installed
- `team_task_management` database created
- Spring Boot connected successfully
- Hibernate schema update enabled
- User table synchronized with the current entity
- User data persisted through the REST API
- Password stored using BCrypt
- Authentication verified against database data

Hibernate configuration:

```properties
spring.jpa.hibernate.ddl-auto=update
```

**Status:** ✅ Connected and tested

---

## Development Status

| Feature                      | Status         |
| ---------------------------- | -------------- |
| Project setup                | ✅ Completed   |
| Angular architecture         | ✅ Completed   |
| Spring Boot architecture     | ✅ Completed   |
| PostgreSQL integration       | ✅ Completed   |
| JWT authentication           | ✅ Completed   |
| Authentication module        | ✅ Completed   |
| Dashboard module             | ✅ Completed   |
| Users frontend CRUD          | ✅ Completed   |
| Projects frontend CRUD       | ✅ Completed   |
| Tasks frontend CRUD          | ✅ Completed   |
| Global notifications         | ✅ Completed   |
| Delete confirmation dialogs  | ✅ Completed   |
| User backend entity          | ✅ Completed   |
| User backend repository      | ✅ Completed   |
| User backend DTOs            | ✅ Completed   |
| User backend mapper          | ✅ Completed   |
| Create user API              | ✅ Completed   |
| Get users API                | ✅ Completed   |
| Get user by ID API           | 🚧 In progress |
| Update user API              | ⏳ Planned     |
| Delete user API              | ⏳ Planned     |
| Projects backend CRUD        | ⏳ Planned     |
| Tasks backend CRUD           | ⏳ Planned     |
| Teams module                 | ⏳ Planned     |
| Roles and permissions        | ⏳ Planned     |
| Frontend/backend integration | ⏳ Planned     |
| Global exception handling    | ⏳ Planned     |
| Request validation           | ⏳ Planned     |
| Pagination and filtering     | ⏳ Planned     |
| Unit tests                   | ⏳ Planned     |
| Docker                       | ⏳ Planned     |
| Deployment                   | ⏳ Planned     |

---

## Important Technical Decisions

- Features are implemented as independent Angular modules.
- Feature routes use lazy loading.
- Components do not directly manage shared application data.
- Data access is handled through services.
- Models are stored separately from components and services.
- Reactive Forms are used for create and edit pages.
- Angular Material Dialog is used before delete operations.
- Angular Material Snackbar is used for global notifications.
- Task status and priority are represented by enums.
- Projects and users are selected by name rather than entering IDs manually.
- Backend entities are not returned directly from controllers.
- DTOs are used for API request and response objects.
- Mappers convert between entities and DTOs.
- Passwords are encoded before database persistence.
- Authentication is stateless.
- JWT authentication is handled by a dedicated security filter.
- Only `/api/auth/**` is publicly accessible.
- User creation is performed through the REST API rather than direct database manipulation.

---

## Current Tested API Flow

```text
Create user through REST API
        ↓
Persist user in PostgreSQL
        ↓
Encode password using BCrypt
        ↓
Log in using username and password
        ↓
Generate JWT token
        ↓
Send token in Authorization header
        ↓
Access protected users endpoint
```

This complete flow has been tested successfully using Postman.

---

## Git Status

The current local changes include:

- User backend entity expansion
- User repository updates
- User DTOs
- User mapper
- User service
- User controller
- User creation endpoint
- Protected user-list endpoint
- Updated Spring Security rules
- PostgreSQL schema updates
- Updated project documentation

These changes represent the first backend milestone for user management and are ready to be committed after updating the `README.md`.

---

## Next Step

Update the `README.md` to document the new Users backend foundation and API authentication flow.

After updating the documentation:

```bash
git add .
git commit -m "feat: implement users backend foundation"
git push origin main
```

After pushing, continue the Users backend CRUD implementation.

Recommended next backend endpoint:

```http
GET /api/users/{id}
```

---

## Development Rules

Continue using these rules:

- Work one step at a time.
- Preserve the current architecture.
- Do not perform unnecessary refactoring.
- Follow Clean Code principles.
- Complete and test each feature before starting another.
- Keep components, services, models, DTOs, mappers, and routing separated.
- Do not expose entities directly through REST controllers.
- Do not store plain-text passwords.
- Do not make protected endpoints publicly accessible except for temporary local testing.
- Build the project as a real enterprise application.
