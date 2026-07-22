# Team Task Management System

An Enterprise-level Full Stack Team Task Management application built to demonstrate modern software engineering practices using Angular and Spring Boot.

This project is being developed as a real-world production-style application following Clean Architecture, Modular Architecture, and Clean Code principles.

---

# Tech Stack

## Frontend

- Angular 13
- Angular Material
- TypeScript
- RxJS
- Reactive Forms
- Angular Routing
- Lazy Loading

---

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- BCrypt Password Encoder

---

## Database

- PostgreSQL

---

# Project Architecture

## Frontend

```
src/app
│
├── core
├── shared
├── features
│     ├── auth
│     ├── dashboard
│     ├── users
│     └── projects (coming next)
│
├── models
├── services
└── layout
```

The application follows a modular architecture where every business feature is isolated inside its own module.

---

# Current Features

## Authentication

- Login page
- JWT Authentication
- Route Guards
- Authentication Service
- Logout

Status

✅ Completed

---

## Dashboard

- Responsive Layout
- Navigation
- Sidebar
- Toolbar

Status

✅ Completed

---

## Users Management

Implemented features

- View users
- Create user
- Edit user
- Delete user
- Delete confirmation dialog
- Global notification service
- Reactive forms
- Form validation

Status

✅ Completed

---

# Backend

Implemented

- Spring Boot project
- Spring Security
- JWT Authentication
- User authentication endpoint
- PostgreSQL integration
- BCrypt password encryption

Status

✅ Completed

---

# Project Principles

The project follows the following engineering principles:

- Clean Architecture
- Clean Code
- SOLID Principles
- Modular Design
- Separation of Concerns
- Reusable Components
- Feature-based Structure

---

# Development Rules

This project is intentionally developed one step at a time.

Every feature is completed before moving to the next one.

The architecture is preserved throughout the project to simulate development inside a professional software company.

---

# Roadmap

Completed

- Authentication Module
- Dashboard Module
- Users Module
- PostgreSQL Integration
- JWT Authentication

Next

- Projects Module
- Tasks Module
- Team Management
- Comments
- File Attachments
- Dashboard Statistics
- Role & Permission Management
- REST API Integration
- Unit Testing
- Docker
- Deployment

---

# Running the Frontend

```bash
cd frontend
npm install
ng serve
```

Application runs on

```
http://localhost:4200
```

---

# Running the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

# Database Configuration

Example configuration

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/team_task_management
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

# Project Status

| Module                 | Status       |
| ---------------------- | ------------ |
| Authentication         | ✅ Completed |
| Dashboard              | ✅ Completed |
| Users                  | ✅ Completed |
| Projects               | ⏳ Planned   |
| Tasks                  | ⏳ Planned   |
| Teams                  | ⏳ Planned   |
| Backend Authentication | ✅ Completed |
| PostgreSQL             | ✅ Completed |

---

# Author

**Kinan Mohrez**

Software Engineer

Frontend & Full Stack Developer

Germany
