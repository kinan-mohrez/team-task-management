# Team Task Management - Project Progress

## Current Architecture

### Frontend

- Angular 13 (Modules)
- Core / Shared / Features architecture
- TokenService created
- AuthService created
- AuthGuard implemented
- AuthInterceptor implemented
- API_ENDPOINTS implemented
- CoreModule created
- LoginComponent connected to backend
- Login stores token using TokenService
- Redirect to Dashboard after login

### Backend

- Spring Boot
- AuthController implemented
- LoginRequest implemented
- LoginResponse implemented
- CorsConfig implemented
- Login currently returns dummy-jwt-token

## Completed

- Angular connected successfully to Spring Boot.
- CORS fixed.
- Login works from Angular.
- Token is stored.
- AuthGuard protects routes.

## Next Step

Implement real JWT authentication in Spring Boot.
