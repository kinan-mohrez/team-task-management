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
- Route Guard
- HTTP Interceptor
- Secure Login
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

### Frontend

- Complete REST API Integration
- User List
- User Details
- Create User
- Edit User
- Delete User
- Search
- Sorting
- Refresh
- Angular Material Table
- Reactive Forms
- Delete Confirmation Dialog
- DTO-based API Communication
- Mapper Pattern
- RxJS `takeUntil` Subscription Management

### Backend

- Complete CRUD REST API
- DTO Pattern
- Mapper Pattern
- Request Validation
- Global Exception Handling
- PostgreSQL Persistence

## Projects

### Frontend

- Complete REST API Integration
- Project List
- Project Details
- Create Project
- Edit Project
- Delete Project
- Angular Material Table
- Delete Confirmation Dialog
- DTO-based API Communication
- Project Mapper
- Project Status Enum
- RxJS `takeUntil` Subscription Management

### Backend

- Complete CRUD REST API
- DTO Pattern
- Mapper Pattern
- Request Validation
- Swagger Documentation
- Role-based Authorization
- PostgreSQL Persistence

## Tasks

### Frontend

- CRUD Interface
- Angular Material Table
- Reactive Forms
- Project and User Selection
- RxJS Subscription Management

### Backend

- In Progress

---

# Project Architecture

## Frontend

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
└── layout
```

## Backend

```text
backend
├── auth
├── common
├── config
├── exception
├── project
└── user
```

---

# API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Running the Project

### Frontend

```bash
cd frontend
npm install
ng serve
```

Runs on:

```text
http://localhost:4200
```

### Backend

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
- DTO & Mapper Pattern
- Dependency Injection
- Feature-based Architecture
- Stateless JWT Authentication
- RxJS Subscription Management (`takeUntil`)

---

# Current Status

| Feature                            | Status |
| ---------------------------------- | :----: |
| Authentication                     |   ✅   |
| Dashboard                          |   ✅   |
| Users Backend                      |   ✅   |
| Users Frontend REST Integration    |   ✅   |
| Password Management                |   ✅   |
| Projects Backend                   |   ✅   |
| Projects Frontend REST Integration |   ✅   |
| Project Details                    |   ✅   |
| Tasks Frontend                     |   ✅   |
| Tasks Backend                      |   ⏳   |
| Teams Module                       |   ⏳   |
| Unit Tests                         |   ⏳   |
| Docker & Deployment                |   ⏳   |

---

# Roadmap

- Complete Tasks Backend
- Integrate Tasks REST API
- Implement Teams Module
- Backend Pagination, Sorting & Filtering
- Unit & Integration Tests
- Dockerize the Application
- Deploy the Project

---

# Author

**Kinan Mohrez**

Software Engineer | Frontend & Full-Stack Developer
