# Team Task Management System

An enterprise-style Full-Stack application for managing users, projects, teams, and tasks.

The project is built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**, following modern software engineering practices with a strong focus on clean architecture, maintainability, scalability, and security.

---

# Technology Stack

## Frontend

* Angular 13
* TypeScript
* Angular Material
* RxJS
* Reactive Forms
* SCSS

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

# Current Features

## Authentication

### Frontend

* Login
* JWT Authentication
* Route Guard
* HTTP Interceptor
* Token Storage
* Logout

### Backend

* Secure Login
* JWT Generation
* JWT Validation
* Stateless Authentication
* Role-based Authorization
* Password Change
* Admin Password Reset
* Force Change Password

---

## Dashboard

* Statistics
* Recent Tasks
* Upcoming Deadlines
* Responsive Layout

---

## Users

### Frontend

* View Users
* Create User
* Edit User
* Delete User
* Angular Material Table
* Reactive Forms
* Delete Confirmation Dialog

### Backend

* Complete CRUD
* DTO Architecture
* Mapper Architecture
* Request Validation
* Global Exception Handling
* PostgreSQL Persistence

---

## Projects

### Frontend

* Complete CRUD

### Backend

* Planned

---

## Tasks

### Frontend

* Complete CRUD

### Backend

* Planned

---

# Project Architecture

## Frontend

```text
frontend/src/app
│
├── core
│   ├── dto
│   ├── services
│   ├── guards
│   ├── interceptors
│   └── constants
│
├── shared
│   ├── components
│   ├── directives
│   ├── pipes
│   └── enums
│
├── features
│   ├── auth
│   ├── dashboard
│   ├── users
│   ├── projects
│   └── tasks
│
└── layout
```

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

---

# API Documentation

Swagger UI is available at:

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

---

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

* Clean Architecture
* Clean Code
* SOLID Principles
* Separation of Concerns
* DTO Pattern
* Mapper Pattern
* Stateless JWT Authentication
* Dependency Injection
* Feature-based Frontend Architecture

---

# Current Status

| Feature                        | Status |
| ------------------------------ | ------ |
| Angular Architecture           | ✅      |
| Spring Boot Architecture       | ✅      |
| PostgreSQL Integration         | ✅      |
| JWT Authentication             | ✅      |
| Swagger / OpenAPI              | ✅      |
| Authentication                 | ✅      |
| Dashboard                      | ✅      |
| Users Frontend                 | ✅      |
| Users Backend                  | ✅      |
| Password Management            | ✅      |
| Projects Frontend              | ✅      |
| Tasks Frontend                 | ✅      |
| Frontend ↔ Backend Integration | 🚧     |
| Projects Backend               | ⏳      |
| Tasks Backend                  | ⏳      |
| Teams Module                   | ⏳      |
| Unit Tests                     | ⏳      |
| Docker                         | ⏳      |
| Deployment                     | ⏳      |

---

# Roadmap

* Complete Frontend ↔ Backend Integration
* Implement Projects Backend
* Implement Tasks Backend
* Implement Teams Module
* Add Pagination, Sorting and Filtering
* Add Unit Tests
* Dockerize the Application
* Deploy the Project

---

# Author

**Kinan Mohrez**

Software Engineer

Frontend & Full-Stack Developer
