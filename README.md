# Team Task Management System

An enterprise-style Full-Stack application for managing users, projects, tasks, and teams.

Built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, **PostgreSQL**, and **Docker**, following Clean Code, SOLID principles, and modern software engineering practices.

---

# Technology Stack

## Frontend

- Angular 13
- TypeScript
- Angular Material
- RxJS
- Reactive Forms
- SCSS
- Karma / Jasmine

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database

- PostgreSQL 16

## DevOps / Containerization

- Docker
- Docker Compose
- Nginx
- PostgreSQL Docker Volume

---

# Features

## Authentication

- JWT Authentication
- Secure Login
- Route Guard
- HTTP Interceptor
- Role-based Authorization

## Application Layout

- Responsive Main Layout
- Navigation Sidebar
- Top Navbar
- Active Route Navigation
- Logout Functionality

## Dashboard

- Backend-driven User-specific Statistics
- In Progress, Completed & Overdue Tasks
- Interactive Statistic Cards
- Recent Tasks & Upcoming Deadlines UI

## Users, Projects & Teams

- Complete CRUD
- REST API Integration
- Details Pages
- Server-side Search, Sorting & Pagination

## Tasks

- Complete CRUD
- REST API Integration
- Project & User Assignment
- Status & Priority Management
- Server-side Search, Sorting & Pagination

---

# Project Structure

```text
frontend/
└── src/app/
    ├── core/
    ├── shared/
    ├── features/
    │   ├── auth/
    │   ├── dashboard/
    │   ├── users/
    │   ├── projects/
    │   ├── tasks/
    │   └── teams/
    ├── models/
    └── layout/

backend/
├── auth/
├── config/
├── project/
├── task/
├── team/
└── user/

docker-compose.yml
```

---

# Running the Project

## Run with Docker

Make sure Docker Desktop is running.

From the project root directory:

```bash
docker compose up -d
```

The application services will start in separate containers:

- Frontend: http://localhost:4200
- Backend: http://localhost:8080
- PostgreSQL: localhost:5433

To stop the containers:

```bash
docker compose stop
```

PostgreSQL data is persisted using a Docker Volume.

## Run Locally

### Frontend

```bash
cd frontend
npm install
npx ng serve
```

Runs on http://localhost:4200

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on http://localhost:8080

---

# Docker Architecture

The application is containerized into three separate services:

```text
Angular Frontend
      │
      ▼
Spring Boot Backend
      │
      ▼
PostgreSQL Database
      │
      ▼
Docker Volume
```

- Angular is built with Node.js and served using Nginx.
- Spring Boot runs in a Java 21 container.
- PostgreSQL 16 runs in a dedicated container.
- Docker Compose manages the application services.
- PostgreSQL data is persisted using a named Docker Volume.

---

# Testing

Frontend unit tests use **Karma and Jasmine**.

Run all frontend tests:

```bash
cd frontend
npx ng test --watch=false --browsers=ChromeHeadless
```

**Latest result: 128/128 tests passed (0 failed, 0 skipped).**

### Implemented Tests

- Existing Component, Service, Guard and Mapper tests repaired.
- TokenService unit tests implemented.
- UsersService unit tests implemented and passing.
- TeamService, ProjectService and TaskService tests expanded.
- CRUD, pagination, sorting and search scenarios covered.
- Response mapping and HTTP error handling tested.
- HTTP requests mocked using Angular HTTP testing utilities.
- TypeScript checking passed.
- No production code changes required.

### Planned Testing

- Measure code coverage.
- Expand Component, Guard and dedicated Mapper behavioral tests.
- Implement Backend unit and integration tests.
- Verify end-to-end application workflows.

---

# Engineering Principles

- Clean Code & SOLID
- Feature-based Architecture
- DTO & Mapper Pattern
- Dependency Injection
- Stateless JWT Authentication
- Server-side Pagination, Sorting & Filtering
- RxJS Subscription Management
- Containerized Application Architecture
- Persistent Database Storage

---

# Current Status

| Module                                   | Status |
| ---------------------------------------- | :----: |
| Authentication                           |   ✅   |
| Main Layout & Navigation                 |   ✅   |
| Dashboard                                |   ✅   |
| Users                                    |   ✅   |
| Projects                                 |   ✅   |
| Tasks                                    |   ✅   |
| Teams                                    |   ✅   |
| Frontend Unit Tests (128/128)            |   ✅   |
| Frontend Service Tests                   |   ✅   |
| Docker Containerization                  |   ✅   |
| Docker Compose                           |   ✅   |
| PostgreSQL Persistent Volume             |   ✅   |
| Code Coverage Measurement                |   ⏳   |
| Extended Component, Guard & Mapper Tests |   ⏳   |
| Backend Tests                            |   ⏳   |
| End-to-End Verification                  |   ⏳   |
| Deployment                               |   ⏳   |

---

# Author

**Kinan Mohrez**

Software Engineer | Frontend & Full-Stack Developer
