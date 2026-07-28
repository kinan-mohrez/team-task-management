# Team Task Management System

An enterprise-style full-stack application for managing users, projects, teams, and tasks.

The project is built with **Angular**, **Spring Boot**, **Spring Security**, **JWT**, and **PostgreSQL**, following enterprise software engineering practices with a strong focus on modular architecture, clean code, maintainability, scalability, and security.

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

## 🔐 Authentication

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
- JWT Authentication Filter
- BCrypt password encoding
- Protected REST endpoints
- Role-based authentication
- `mustChangePassword` login support

---

## 📊 Dashboard

- Statistics cards
- Recent tasks
- Upcoming deadlines
- Responsive layout
- Sidebar
- Toolbar

---

## 👥 Users

### Frontend

- View users
- Create user
- Edit user
- Delete user
- Delete confirmation dialog
- Angular Material table
- Reactive Forms
- Success notifications
- In-memory data service

### Backend

Implemented:

- Complete Users CRUD
- User entity
- Repository layer
- Service layer
- REST Controller
- DTOs
- Entity-to-DTO Mapper
- Request validation
- Global exception handling
- Username uniqueness validation
- Email uniqueness validation
- BCrypt password encoding
- PostgreSQL persistence
- Password change endpoint
- Administrator password reset endpoint
- Force Change Password support

Authentication and all user endpoints have been successfully tested using Postman.

---

## 📁 Projects

### Frontend

- View projects
- Create project
- Edit project
- Delete project
- Status management
- Angular Material table

### Backend

Planned.

---

## ✅ Tasks

### Frontend

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

### Backend

Planned.

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

The frontend architecture follows:

- Feature Modules
- Lazy Loading
- Shared Models
- Service-based Architecture
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
├── security
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
- Global Exception Handling

---

# REST API

## Public Endpoint

```http
POST /api/auth/login
```

Returns:

```json
{
	"token": "<JWT_TOKEN>",
	"mustChangePassword": false
}
```

---

## Protected Endpoints

```http
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

All protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
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

Passwords are securely stored using **BCrypt**.

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

| Feature                         | Status |
| ------------------------------- | ------ |
| Angular Architecture            | ✅     |
| Spring Boot Architecture        | ✅     |
| PostgreSQL                      | ✅     |
| JWT Authentication              | ✅     |
| Authentication                  | ✅     |
| Dashboard                       | ✅     |
| Users Frontend CRUD             | ✅     |
| Users Backend CRUD              | ✅     |
| Request Validation              | ✅     |
| Global Exception Handling       | ✅     |
| Password Management             | ✅     |
| Force Change Password (Backend) | ✅     |
| Projects Frontend CRUD          | ✅     |
| Tasks Frontend CRUD             | ✅     |
| Frontend/Backend Integration    | 🚧     |
| Projects Backend                | ⏳     |
| Tasks Backend                   | ⏳     |
| Teams Module                    | ⏳     |
| Unit Tests                      | ⏳     |
| Docker                          | ⏳     |
| Deployment                      | ⏳     |

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

- Integrate Angular with the completed Users REST API
- Implement Force Change Password in the frontend
- Projects Backend CRUD
- Tasks Backend CRUD
- Pagination
- Filtering
- Unit Testing
- Docker
- Deployment

---

# Author

**Kinan Mohrez**

Software Engineer

Frontend & Full-Stack Developer

Germany
