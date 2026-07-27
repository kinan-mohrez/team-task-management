# Team Task Management System

An enterprise-style full-stack application for managing users, projects, teams, and tasks.

The project is built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**, following enterprise software engineering practices with a strong focus on modular architecture, clean code, maintainability, and scalability.

---

# Technology Stack

## Frontend

- Angular 13
- TypeScript
- Angular Material
- RxJS
- Reactive Forms
- SCSS
- Angular Router
- Lazy-loaded Feature Modules

## Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- BCrypt Password Encoder
- Maven

## Database

- PostgreSQL

---

# Current Features

## Authentication

### Frontend

- Login page
- JWT Authentication
- Route Guard
- HTTP Interceptor
- Logout
- Reactive Form validation

### Backend

- Secure login endpoint
- JWT generation
- JWT validation
- Stateless authentication
- BCrypt password verification
- Protected REST endpoints

---

## Dashboard

- Statistics cards
- Recent tasks
- Upcoming deadlines
- Responsive layout
- Sidebar
- Toolbar

---

## Users

### Frontend

- View users
- Create user
- Edit user
- Delete user
- Delete confirmation dialog
- Angular Material table
- Reactive Forms
- Success notifications

### Backend

Implemented:

- User entity
- User repository
- User service
- User controller
- DTOs
- Entity-to-DTO mapper
- Create User API
- Get Users API
- Password encryption
- Username validation
- Email validation
- PostgreSQL persistence

Authentication flow tested successfully using Postman.

---

## Projects

Implemented on the frontend:

- View projects
- Create project
- Edit project
- Delete project
- Status management
- Angular Material table

Backend implementation is planned.

---

## Tasks

Implemented on the frontend:

- View tasks
- Create task
- Edit task
- Delete task
- Task priority
- Task status
- Due dates
- User assignment
- Project assignment
- Angular Material table

Backend implementation is planned.

---

# Project Architecture

## Frontend

```text
frontend/src/app
│
├── core
├── shared
├── layout
├── models
│   ├── dashboard
│   ├── users
│   ├── project
│   └── tasks
│
└── features
    ├── auth
    ├── dashboard
    ├── users
    ├── projects
    └── tasks
```

Each feature is isolated inside its own module.

The architecture follows:

- Feature Modules
- Lazy Loading
- Shared Models
- Service-based state management
- Separation of Concerns

---

## Backend

```text
backend
│
├── auth
├── common
├── config
├── exception
└── user
    ├── controller
    ├── dto
    ├── entity
    ├── mapper
    ├── repository
    └── service
```

The backend follows a layered architecture using:

- Controllers
- Services
- Repositories
- DTOs
- Mappers
- JPA Entities
- Spring Security

---

# REST API

## Public Endpoint

```http
POST /api/auth/login
```

Returns a JWT token.

---

## Protected Endpoints

```http
GET /api/users
```

Requires:

```http
Authorization: Bearer <JWT_TOKEN>
```

Currently implemented:

```http
POST /api/users
GET /api/users
```

---

# Database

PostgreSQL is used as the persistence layer.

Example configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/team_task_management
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Passwords are stored using BCrypt.

---

# Engineering Principles

This project follows:

- Clean Architecture
- Clean Code
- SOLID Principles
- Separation of Concerns
- Layered Architecture
- DTO Pattern
- Mapper Pattern
- Stateless Authentication
- Dependency Injection
- Feature-based Frontend Architecture

---

# Current Development Status

| Feature                      | Status |
| ---------------------------- | ------ |
| Angular Architecture         | ✅     |
| Spring Boot Foundation       | ✅     |
| PostgreSQL                   | ✅     |
| JWT Authentication           | ✅     |
| Authentication               | ✅     |
| Dashboard                    | ✅     |
| Users Frontend CRUD          | ✅     |
| Users Backend Foundation     | ✅     |
| Projects Frontend CRUD       | ✅     |
| Tasks Frontend CRUD          | ✅     |
| Projects Backend             | ⏳     |
| Tasks Backend                | ⏳     |
| Teams Module                 | ⏳     |
| Roles & Permissions          | ⏳     |
| Frontend/Backend Integration | ⏳     |
| Unit Tests                   | ⏳     |
| Docker                       | ⏳     |
| Deployment                   | ⏳     |

---

# Running the Project

## Frontend

```bash
cd frontend
npm install
ng serve
```

Runs on:

```
http://localhost:4200
```

---

## Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

---

# Roadmap

Upcoming milestones:

- Complete Users Backend CRUD
- Projects Backend CRUD
- Tasks Backend CRUD
- Connect Angular to REST APIs
- Pagination
- Filtering
- Validation
- Global Exception Handling
- Role-based Authorization
- Unit Testing
- Docker
- Deployment

---

# Author

**Kinan Mohrez**

Software Engineer

Frontend & Full-Stack Developer

Germany
