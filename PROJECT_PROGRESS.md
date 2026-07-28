# 🚀 Team Task Management System — Project Progress

> Enterprise-style Full-Stack application built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**.

![Angular](https://img.shields.io/badge/Angular-13-DD0031?logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-Enabled-6DB33F?logo=springsecurity&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

**Last Updated:** **2026-07-28**

---

# 🎯 Project Goal

Build an enterprise-style **Team Task Management System** using:

- Angular 13
- Angular Material
- Spring Boot
- Spring Security
- JWT Authentication
- PostgreSQL
- Hibernate / JPA

The project follows:

- ✅ Modular Architecture
- ✅ Clean Architecture
- ✅ Clean Code
- ✅ Separation of Concerns
- ✅ Feature-based Structure
- ✅ Reusable Services and Components
- ✅ Lazy-loaded Angular Modules
- ✅ DTO-based API Communication
- ✅ Secure Stateless Authentication

---

# 📌 Current Status

## 🖥️ Frontend

### ✅ Completed Modules

- Authentication Module
- Dashboard Module
- Users Module
- Projects Module
- Tasks Module

The **Users**, **Projects**, and **Tasks** modules currently use in-memory services and are not yet connected to their backend APIs.

### 🎯 Next Frontend Goal

Integrate the Angular application with the completed backend APIs, starting with:

- Authentication
- Force Change Password
- Users Module

---

## ⚙️ Backend

### ✅ Completed

- Spring Boot project setup
- Spring Security configuration
- Stateless JWT authentication
- Login endpoint
- JWT Authentication Filter
- BCrypt password encoding
- PostgreSQL integration
- Hibernate / JPA configuration
- Complete Users CRUD REST API
- DTO & Mapper architecture
- Request validation
- Global exception handling
- Role-based authorization
- Password change endpoint
- Administrator password reset endpoint
- Force Change Password backend implementation
- `mustChangePassword` login support
- End-to-end authentication & password management testing

---

# 🏗️ Frontend Architecture

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

- ✅ Angular Feature Modules
- ✅ Lazy-loaded Routing
- ✅ Reactive Forms
- ✅ Angular Material
- ✅ Services separated from Components
- ✅ Dedicated Models
- ✅ Global Notification Service
- ✅ Confirmation Dialogs

---

# 🔐 Authentication Module

### ✅ Implemented

- Login page
- Reactive Form validation
- Authentication service
- JWT token storage
- Route Guard
- HTTP Interceptor
- Protected routes
- Logout functionality

**Status:** ✅ Completed

### 🚧 Next Step

- Support `mustChangePassword`
- Redirect users to the Change Password page when required
- Block application access until the password has been changed successfully

---

# 📊 Dashboard Module

### ✅ Implemented

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

# 👥 Users Frontend Module

### ✅ Implemented

- User list
- Angular Material table
- Create user
- Edit user
- Delete user
- Delete confirmation dialog
- Reactive Form validation
- Success notifications
- In-memory user service

### 📄 User Fields

- ID
- First name
- Last name
- Email
- Role
- Enabled status

**Status:** ✅ Frontend CRUD completed with in-memory data

---

# 📁 Projects Module

### ✅ Implemented

- Project list
- Angular Material table
- Create project
- Edit project
- Delete project
- Delete confirmation dialog
- Reactive Form validation
- Success notifications
- In-memory project service

### 📄 Project Fields

- ID
- Name
- Description
- Start date
- End date
- Status

**Status:** ✅ Frontend CRUD completed with in-memory data

---

# ✅ Tasks Module

### ✅ Implemented

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

### 📄 Task Fields

- ID
- Title
- Description
- Status
- Priority
- Due date
- Project
- Assigned user

### ⚙️ Additional Implementation Details

- Project selection uses data from `ProjectService`.
- Assigned-user selection uses data from `UsersService`.
- Project and assigned-user names are displayed in the task table.
- Task status uses `TaskStatus`.
- Task priority uses `TaskPriority`.
- The task model uses strongly typed enums.
- Delete notifications appear only after confirmation.

**Status:** ✅ Frontend CRUD completed with in-memory data

---

# 🔔 Global Notification Service

Implemented using **Angular Material Snackbar**.

### ✅ Available Methods

```ts
showSuccess(message: string): void
showError(message: string): void
showInfo(message: string): void
showWarning(message: string): void
```

### ⚙️ Configuration

`MatSnackBarModule` is imported in `AppModule` because `NotificationService` is provided through the root injector.

This prevents the following dependency injection error:

```text
NullInjectorError: No provider for MatSnackBar
```

**Status:** ✅ Completed

---

# 🏗️ Backend Architecture

The backend follows a **feature-oriented architecture**, separating responsibilities into dedicated layers to ensure scalability, maintainability, and clean code.

### 📦 Package Structure

- Controllers
- Services
- Repositories
- Entities
- DTOs
- Mappers
- Security
- Configuration
- Exception Handling

Current backend packages:

```text
com.kinan.taskmanagement
│
├── auth
├── common
├── config
├── exception
├── security
└── user
    ├── controller
    ├── dto
    ├── entity
    ├── mapper
    ├── repository
    └── service
```

**Status:** ✅ Enterprise Architecture Implemented

---

# 🔐 Authentication Backend

### ✅ Implemented

- Spring Security
- Stateless Session Management
- JWT Generation
- JWT Validation
- JWT Authentication Filter
- BCrypt Password Encoding
- Public Authentication Endpoint
- Protected REST Endpoints
- User Roles loaded from PostgreSQL
- `mustChangePassword` support

Authentication endpoint:

```http
POST /api/auth/login
```

Example successful response:

```json
{
	"token": "<JWT_TOKEN>",
	"mustChangePassword": false
}
```

The JWT token is sent using:

```http
Authorization: Bearer <token>
```

Authentication flow has been fully tested using Postman.

**Status:** ✅ Completed and Tested

---

# 👥 Users Backend

### ✅ Implemented

- `User` JPA Entity
- `UserRepository`
- `UserService`
- `UserController`
- `UserMapper`
- `CreateUserRequest`
- `UpdateUserRequest`
- `UserResponse`
- Complete CRUD Operations
- Request Validation
- Global Exception Handling
- BCrypt Password Encoding
- Username Uniqueness Validation
- Email Uniqueness Validation
- PostgreSQL Persistence
- Role Support
- Password Change
- Administrator Password Reset
- Force Change Password

### 📄 User Fields

- ID
- First Name
- Last Name
- Username
- Email
- Password
- Role
- Enabled Status
- Must Change Password

### 🌐 Implemented REST Endpoints

```http
POST   /api/users
GET    /api/users
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### 🔒 Security

Current security configuration:

```java
.requestMatchers("/api/auth/**").permitAll()
.anyRequest().authenticated()
```

This means:

- Authentication endpoints are public.
- Every other endpoint requires a valid JWT.
- User roles are loaded from PostgreSQL.
- Passwords are stored using BCrypt.
- Administrative operations are protected.

### 🧪 Tested Successfully

- Create User
- Get All Users
- Get User By ID
- Update User
- Delete User
- Login
- JWT Authentication
- Password Change
- Administrator Password Reset
- Force Change Password
- Validation Errors
- Protected Endpoints

**Status:** ✅ Backend CRUD Completed

# 🗄️ Database Status

### ✅ Implemented and Verified

- PostgreSQL installed
- `team_task_management` database created
- Spring Boot connected successfully
- Hibernate schema update enabled
- User table synchronized with the current entity
- User data persisted through the REST API
- Passwords stored using BCrypt
- Authentication verified against database data
- Roles persisted in PostgreSQL
- `must_change_password` column added successfully
- Password management fully tested
- Force Change Password flow verified

Hibernate configuration:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Database migration executed:

```sql
ALTER TABLE users
ADD COLUMN must_change_password BOOLEAN NOT NULL DEFAULT FALSE;
```

**Status:** ✅ Connected and Fully Tested

---

# 📈 Development Status

| Feature                          | Status       |
| -------------------------------- | ------------ |
| Project Setup                    | ✅ Completed |
| Angular Architecture             | ✅ Completed |
| Spring Boot Architecture         | ✅ Completed |
| PostgreSQL Integration           | ✅ Completed |
| JWT Authentication               | ✅ Completed |
| Authentication Module            | ✅ Completed |
| Dashboard Module                 | ✅ Completed |
| Users Frontend CRUD              | ✅ Completed |
| Projects Frontend CRUD           | ✅ Completed |
| Tasks Frontend CRUD              | ✅ Completed |
| Global Notifications             | ✅ Completed |
| Delete Confirmation Dialogs      | ✅ Completed |
| User Backend Entity              | ✅ Completed |
| User Backend Repository          | ✅ Completed |
| User Backend DTOs                | ✅ Completed |
| User Backend Mapper              | ✅ Completed |
| Users Backend CRUD               | ✅ Completed |
| Roles & Authorization            | ✅ Completed |
| Request Validation               | ✅ Completed |
| Global Exception Handling        | ✅ Completed |
| Change Password                  | ✅ Completed |
| Admin Reset Password             | ✅ Completed |
| Force Change Password (Backend)  | ✅ Completed |
| Force Change Password (Frontend) | 🚧 Next Step |
| Frontend ↔ Backend Integration   | ⏳ Planned   |
| Projects Backend CRUD            | ⏳ Planned   |
| Tasks Backend CRUD               | ⏳ Planned   |
| Teams Module                     | ⏳ Planned   |
| Pagination & Filtering           | ⏳ Planned   |
| Unit Tests                       | ⏳ Planned   |
| Docker                           | ⏳ Planned   |
| Deployment                       | ⏳ Planned   |

---

# 🧠 Important Technical Decisions

- Features are implemented as independent Angular modules.
- Feature routes use lazy loading.
- Components do not directly manage shared application data.
- Data access is handled through services.
- Models are stored separately from components and services.
- Reactive Forms are used for create and edit pages.
- Angular Material Dialog is used before delete operations.
- Angular Material Snackbar is used for global notifications.
- Task status and priority are represented by strongly typed enums.
- Projects and users are selected by name rather than entering IDs manually.
- Backend entities are never exposed directly through REST controllers.
- DTOs are used for every API request and response.
- Mappers convert between entities and DTOs.
- Passwords are encoded using BCrypt before database persistence.
- Authentication is completely stateless.
- JWT authentication is handled through a dedicated security filter.
- User roles are loaded from PostgreSQL.
- Only `/api/auth/**` endpoints are publicly accessible.
- Password encoding is configured through a dedicated `PasswordEncoderConfig`.
- Administrator password resets require the user to change the password on the next login.
- `mustChangePassword` is returned in the login response to support the frontend flow.

---

# 🔄 Current Tested Authentication Flow

```text
User logs in
      ↓
Spring Security authenticates the request
      ↓
User loaded from PostgreSQL
      ↓
BCrypt verifies the password
      ↓
JWT token generated
      ↓
Login response returns:
    • JWT Token
    • mustChangePassword
      ↓
Frontend stores the JWT
      ↓
JWT sent in Authorization header
      ↓
JWT Filter validates the token
      ↓
Protected endpoint accessed successfully
```

Authentication flow has been fully tested using Postman.

---

# 🔑 Current Tested Password Management Flow

```text
Administrator resets user password
          ↓
Password encoded using BCrypt
          ↓
mustChangePassword = true
          ↓
User logs in
          ↓
Login response returns mustChangePassword = true
          ↓
Frontend redirects user to Change Password
          ↓
User changes password
          ↓
Current password verified
          ↓
New password encoded
          ↓
mustChangePassword = false
```

The backend implementation has been fully completed and tested.

---

# 📦 Git Status

Current local changes include:

- Complete Users Backend CRUD
- Request Validation
- Global Exception Handling
- Role Support
- JWT Authentication Improvements
- Password Change Endpoint
- Administrator Password Reset
- Force Change Password Backend
- `mustChangePassword` Login Support
- PasswordEncoder Configuration
- PostgreSQL Schema Updates
- Updated Project Documentation

These changes are ready to be committed and pushed to GitHub.

Recommended commands:

```bash
git status
git add .
git commit -m "feat: complete backend password management"
git push origin main
```

---

# ⏭️ Next Step

The backend authentication system and password management are now complete.

The next development phase is to integrate the Angular frontend with the completed backend APIs.

### 🎯 Upcoming Tasks

1. Extend the Angular login response model to include:

```ts
mustChangePassword: boolean;
```

2. Update the authentication service to handle the new response.

3. Redirect users to the **Change Password** page when:

```ts
mustChangePassword === true;
```

4. Prevent users from accessing the application until they successfully change their password.

5. Connect the Angular Users module to the completed Users REST API.

6. After completing the frontend integration, begin implementing the Projects backend module.

---

# 📦 Ready for GitHub

The current implementation is ready to be committed.

```bash
git status
git add .
git commit -m "feat: complete backend password management"
git push origin main
```

---

# 📋 Development Rules

Continue following these rules throughout the project:

- Work one step at a time.
- Preserve the existing architecture.
- Avoid unnecessary refactoring.
- Follow Clean Code principles.
- Follow SOLID principles whenever applicable.
- Complete and fully test each feature before starting the next.
- Keep Components, Services, Models, DTOs, Mappers, and Routing separated.
- Never expose JPA entities directly through REST controllers.
- Store passwords only as BCrypt hashes.
- Keep authentication stateless using JWT.
- Protect all REST endpoints except `/api/auth/**`.
- Build the project as a real enterprise application suitable for production-quality architecture.
