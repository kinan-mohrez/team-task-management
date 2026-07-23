# Team Task Management System

An enterprise-style full-stack application for managing users, projects, teams, and tasks.

The project is built with **Angular**, **Spring Boot**, and **PostgreSQL** to demonstrate professional frontend architecture, backend security, modular development, and clean software-engineering practices.

---

## Technology Stack

### Frontend

- Angular 13
- TypeScript
- Angular Material
- RxJS
- Reactive Forms
- SCSS
- Angular Router
- Lazy-loaded feature modules

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- BCrypt Password Encoder
- Maven

### Database

- PostgreSQL

---

## Current Features

### Authentication

- Login page
- JWT authentication
- Authentication service
- Route Guard
- HTTP Interceptor
- Protected routes
- Logout functionality
- Reactive Form validation

### Dashboard

- Responsive application layout
- Statistics cards
- Recent tasks
- Upcoming deadlines
- Sidebar navigation
- Toolbar
- Service-based data access
- Dedicated dashboard models

### Users Management

- View users
- Create users
- Edit users
- Delete users
- Delete confirmation dialog
- Reactive Form validation
- Success notifications

### Projects Management

- View projects
- Create projects
- Edit projects
- Delete projects
- Delete confirmation dialog
- Project status management
- Reactive Form validation
- Success notifications

### Tasks Management

- View tasks
- Create tasks
- Edit tasks
- Delete tasks
- Delete confirmation dialog
- Assign tasks to users
- Link tasks to projects
- Task status management
- Task priority management
- Due-date selection
- Reactive Form validation
- Success notifications
- Strongly typed status and priority enums

---

## Project Architecture

### Frontend

```text
frontend/src/app
│
├── core
│   └── services
│
├── shared
│
├── layout
│
├── models
│   ├── dashboard
│   ├── project
│   ├── tasks
│   └── users
│
└── features
    ├── auth
    ├── dashboard
    ├── users
    ├── projects
    └── tasks
```

Each business feature is isolated inside its own module and contains its own:

- Pages
- Components
- Services
- Routing configuration

Shared domain models are stored in dedicated model folders.

### Backend

The backend follows a layered architecture:

```text
backend
│
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── common
```

---

## Engineering Principles

The project follows:

- Clean Code
- Modular Architecture
- Separation of Concerns
- Feature-based Architecture
- Reusable Components
- Reusable Services
- Strong typing
- Dependency Injection
- Lazy Loading
- Layered backend design
- Incremental feature development

---

## Current Development Status

| Module                            | Status       |
| --------------------------------- | ------------ |
| Project setup                     | ✅ Completed |
| Frontend architecture             | ✅ Completed |
| Backend foundation                | ✅ Completed |
| PostgreSQL integration            | ✅ Completed |
| JWT authentication                | ✅ Completed |
| Authentication                    | ✅ Completed |
| Dashboard                         | ✅ Completed |
| Users frontend CRUD               | ✅ Completed |
| Projects frontend CRUD            | ✅ Completed |
| Tasks frontend CRUD               | ✅ Completed |
| Teams                             | ⏳ Planned   |
| Roles and permissions             | ⏳ Planned   |
| Backend business CRUD APIs        | ⏳ Planned   |
| Frontend/backend CRUD integration | ⏳ Planned   |
| Unit testing                      | ⏳ Planned   |
| Docker                            | ⏳ Planned   |
| Deployment                        | ⏳ Planned   |

> The Users, Projects, and Tasks modules currently use in-memory Angular services. Their Spring Boot CRUD APIs and database integration are planned for a later development phase.

---

## Running the Project

### Prerequisites

Install:

- Node.js and npm
- Angular CLI
- Java
- Maven
- PostgreSQL

### Frontend

```bash
cd frontend
npm install
ng serve
```

The frontend runs at:

```text
http://localhost:4200
```

Available frontend routes include:

```text
/login
/dashboard
/users
/projects
/tasks
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

---

## Database Configuration

Create a PostgreSQL database named:

```text
team_task_management
```

Configure the backend in `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/team_task_management
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Do not commit real passwords, JWT secrets, or other credentials to GitHub.

---

## Roadmap

### Completed

- Project setup
- Angular modular architecture
- Spring Boot foundation
- PostgreSQL integration
- JWT authentication
- Authentication Module
- Dashboard Module
- Users Module
- Projects Module
- Tasks Module
- Global notification service
- Delete confirmation dialogs

### Planned

- Teams Management
- Roles and Permissions
- Users REST API
- Projects REST API
- Tasks REST API
- Frontend/backend CRUD integration
- Comments
- File attachments
- Activity timeline
- Dashboard analytics
- Unit and integration tests
- Docker configuration
- Deployment

---

## Author

**Kinan Mohrez**

Software Engineer
Frontend & Full-Stack Developer
Germany
