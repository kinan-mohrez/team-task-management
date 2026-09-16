# Team Task Management System

An enterprise-style Full-Stack application for managing users, projects, tasks, and teams.

Built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**, following Clean Code, SOLID principles, and modern software engineering practices.

---

# Technology Stack

## Frontend

* Angular 13
* TypeScript
* Angular Material
* RxJS
* Reactive Forms
* SCSS
* Karma / Jasmine

## Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* Maven

## Database

* PostgreSQL

---

# Features

## Authentication

* JWT Authentication
* Secure Login
* Route Guard
* HTTP Interceptor
* Role-based Authorization

## Application Layout

* Responsive Main Layout
* Navigation Sidebar
* Top Navbar
* Active Route Navigation
* Logout Functionality

## Dashboard

* Backend-driven User-specific Statistics
* In Progress, Completed & Overdue Tasks
* Interactive Statistic Cards
* Recent Tasks & Upcoming Deadlines UI

## Users, Projects & Teams

* Complete CRUD
* REST API Integration
* Details Pages
* Server-side Search, Sorting & Pagination

## Tasks

* Complete CRUD
* REST API Integration
* Project & User Assignment
* Status & Priority Management
* Server-side Search, Sorting & Pagination

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
```

---

# Running the Project

## Frontend

```bash
cd frontend
npm install
npx ng serve
```

Runs on http://localhost:4200

## Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on http://localhost:8080

---

# Testing

Frontend unit tests use **Karma and Jasmine**.

Run all frontend tests:

```bash
cd frontend
npx ng test --watch=false --browsers=ChromeHeadless
```

**Latest result (2026-09-17):** 57/57 tests passed, as reported by Codex.

* Existing Component, Service, Guard and Mapper tests repaired.
* TokenService unit tests implemented.
* HTTP requests mocked using Angular HTTP testing utilities.
* Comprehensive Service unit tests are in progress.

Backend unit and integration tests are planned.

---

# Engineering Principles

* Clean Code & SOLID
* Feature-based Architecture
* DTO & Mapper Pattern
* Dependency Injection
* Stateless JWT Authentication
* Server-side Pagination, Sorting & Filtering
* RxJS Subscription Management

---

# Current Status

| Module                      | Status |
| --------------------------- | :----: |
| Authentication              |    ✅   |
| Main Layout & Navigation    |    ✅   |
| Dashboard                   |    ✅   |
| Users                       |    ✅   |
| Projects                    |    ✅   |
| Tasks                       |    ✅   |
| Teams                       |    ✅   |
| Existing Frontend Tests     |    ✅   |
| Comprehensive Service Tests |    ⏳   |
| Backend Tests               |    ⏳   |
| Docker & Deployment         |    ⏳   |

---

# Author

**Kinan Mohrez**

Software Engineer | Frontend & Full-Stack Developer
