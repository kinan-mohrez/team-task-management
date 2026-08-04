# Team Task Management System

An enterprise-style Full-Stack application for managing users, projects, teams, and tasks.

Built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**, following Clean Architecture, SOLID principles, and modern enterprise development practices.

---

# Technology Stack

## Frontend

- Angular 13
- TypeScript
- Angular Material
- RxJS
- Reactive Forms
- SCSS

## Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database

- PostgreSQL

---

# Features

## Authentication

- JWT Authentication
- Secure Login
- Route Guard
- HTTP Interceptor
- Role-based Authorization
- Password Change
- Admin Password Reset
- Force Change Password

## Dashboard

- Statistics
- Recent Tasks
- Upcoming Deadlines
- Responsive Layout

## Users

- Complete CRUD
- REST API Integration
- User Details
- Search, Sorting & Pagination
- Reactive Forms
- DTO & Mapper Pattern
- Delete Confirmation Dialog

## Projects

- Complete CRUD
- REST API Integration
- Project Details
- Search, Sorting & Pagination
- Shared ProjectStatus Enum
- DTO & Mapper Pattern
- Delete Confirmation Dialog

## Tasks

- Complete CRUD
- REST API Integration
- Project & User Assignment
- Search, Sorting & Pagination
- Shared TaskStatus & TaskPriority Enums
- DTO & Mapper Pattern
- Delete Confirmation Dialog

---

# Project Architecture

```text
frontend/src/app
├── core
├── shared
├── features
│   ├── auth
│   ├── dashboard
│   ├── users
│   ├── projects
│   └── tasks
├── models
└── layout
```

```text
backend
├── auth
├── common
├── config
├── exception
├── project
├── task
└── user
```

---

# API Documentation

Swagger UI

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Running the Project

## Frontend

```bash
cd frontend
npm install
ng serve
```

Runs on:

```text
http://localhost:4200
```

## Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on:

```text
http://localhost:8080
```

---

# Engineering Principles

- Clean Architecture
- Clean Code
- SOLID Principles
- Feature-based Architecture
- DTO & Mapper Pattern
- Dependency Injection
- Stateless JWT Authentication
- RxJS (`takeUntil`)

---

# Current Status

| Module | Status |
| :----- | :----: |
| Authentication | ✅ |
| Dashboard | ✅ |
| Users | ✅ |
| Projects | ✅ |
| Tasks | ✅ |
| Teams | ⏳ |
| Unit Tests | ⏳ |
| Docker & Deployment | ⏳ |

---

# Roadmap

- Task Details
- Teams Module
- Backend Pagination & Filtering
- Unit & Integration Tests
- Dockerize the Application
- Deploy the Project

---

# Author

**Kinan Mohrez**

Software Engineer | Frontend & Full-Stack Developer