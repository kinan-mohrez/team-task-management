# Team Task Management System

An enterprise-style Full-Stack application for managing users, projects, tasks, and teams.

Built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**, following Clean Code, SOLID principles, and modern software engineering practices.

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
- Token-based Session Handling

## Application Layout

- Responsive Main Layout
- Navigation Sidebar
- Top Navbar
- Active Route Navigation
- Logout Functionality
- Consistent Application Styling

## Dashboard

- Backend-driven Statistics
- User-specific Task Statistics
- In Progress Tasks
- Completed Tasks
- Overdue Tasks
- Recent Tasks
- Upcoming Deadlines
- Interactive Statistic Cards

## Users

- Complete CRUD
- REST API Integration
- User Details
- Role & Account Management
- Search, Sorting & Pagination

## Projects

- Complete CRUD
- REST API Integration
- Project Details
- Search, Sorting & Pagination

## Tasks

- Complete CRUD
- REST API Integration
- Task Details
- Project & User Assignment
- Status & Priority Management
- Search, Sorting & Pagination

## Teams

- Complete CRUD
- REST API Integration
- Team Details
- Search, Sorting & Pagination

---

# Project Structure

```text
frontend
├── core
├── shared
├── features
│   ├── auth
│   ├── dashboard
│   ├── users
│   ├── projects
│   ├── tasks
│   └── teams
├── models
└── layout

backend
├── auth
├── config
├── project
├── task
├── team
└── user
```

---

# Running the Project

## Frontend

```bash
cd frontend
npm install
ng serve
```

Runs on `http://localhost:4200`

## Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080`

---

# Engineering Principles

- Clean Code
- SOLID Principles
- Feature-based Architecture
- DTO & Mapper Pattern
- Dependency Injection
- Stateless JWT Authentication
- Server-side Pagination, Sorting & Filtering
- RxJS Subscription Management

---

# Current Status

| Module | Status |
| :--- | :---: |
| Authentication | ✅ |
| Main Layout & Navigation | ✅ |
| Dashboard | ✅ |
| Users | ✅ |
| Projects | ✅ |
| Tasks | ✅ |
| Teams | ✅ |
| Testing | ⏳ |
| Docker & Deployment | ⏳ |

---

# Author

**Kinan Mohrez**

Software Engineer | Frontend & Full-Stack Developer