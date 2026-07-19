# Team Task Management System

A modern full-stack web application for managing teams, projects, and tasks. The application is designed with a scalable and modular architecture using Angular and Spring Boot, providing secure authentication, efficient project organization, and a maintainable RESTful API.

---

## Overview

The Team Task Management System is designed to simplify collaboration between teams by providing a centralized platform for managing projects, assigning tasks, and tracking progress.

The application follows modern software engineering practices with a clear separation between frontend and backend, secure JWT-based authentication, and a modular architecture that supports future expansion.

---

## Key Features

### Authentication & Security

- JWT Authentication
- Spring Security
- Stateless Authentication
- Password Encryption
- Route Protection (Angular Guards)
- HTTP Authorization Interceptor
- Secure REST API

### Backend

- Spring Boot REST API
- Spring Data JPA
- Hibernate ORM
- User Management
- Authentication Service
- JWT Service
- Security Configuration
- CORS Configuration
- Layered Architecture

### Frontend

- Angular 13
- Modular Architecture
- Core & Shared Modules
- Feature Modules
- Authentication Module
- Dashboard Module
- API Service Layer
- Responsive Routing

---

## Technology Stack

### Frontend

- Angular 13
- TypeScript
- SCSS
- Angular Router
- RxJS

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

### Database

- PostgreSQL

---

## Project Structure

```text
team-task-management/
│
├── backend/
│   ├── auth/
│   ├── config/
│   ├── security/
│   ├── user/
│   └── ...
│
├── frontend/
│   ├── core/
│   ├── shared/
│   ├── features/
│   └── ...
│
├── PROJECT_PROGRESS.md
└── README.md
```

---

## Current Development Status

| Module                 | Status         |
| ---------------------- | -------------- |
| Project Architecture   | ✅ Completed   |
| Angular Setup          | ✅ Completed   |
| Spring Boot Setup      | ✅ Completed   |
| JWT Authentication     | ✅ Completed   |
| Spring Security        | ✅ Completed   |
| Login Flow             | ✅ Completed   |
| Angular Authentication | ✅ Completed   |
| PostgreSQL Integration | 🚧 In Progress |
| User Registration      | 📋 Planned     |
| Team Management        | 📋 Planned     |
| Project Management     | 📋 Planned     |
| Task Management        | 📋 Planned     |
| Dashboard              | 📋 Planned     |

---

## Development Roadmap

Upcoming milestones include:

- PostgreSQL integration
- User registration
- Team management
- Project management
- Task management
- Role-based authorization
- Dashboard analytics
- File attachments
- Notifications
- User profile management

---

## Running the Project

### Backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL

```text
http://localhost:8080
```

---

### Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend URL

```text
http://localhost:4200
```

---

## Architecture Highlights

- Modular Angular Architecture
- Layered Spring Boot Architecture
- RESTful API Design
- JWT-based Authentication
- Stateless Security
- Dependency Injection
- Separation of Concerns
- Scalable Project Structure

---

## Repository Contents

| Directory             | Description                |
| --------------------- | -------------------------- |
| `frontend`            | Angular client application |
| `backend`             | Spring Boot REST API       |
| `PROJECT_PROGRESS.md` | Development progress log   |
| `README.md`           | Project documentation      |

---

## Future Enhancements

The project is actively evolving with planned support for:

- Team collaboration
- Project workspaces
- Task assignment workflow
- Activity tracking
- File management
- Notifications
- Reporting dashboard
- Administrative features

---

## Author

**Kinan Mohrez**

Full Stack Developer

**Technologies**

- Java
- Spring Boot
- Spring Security
- Angular
- TypeScript
- PostgreSQL
- REST APIs
- JWT Authentication
