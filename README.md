# Training Project

A modern course management platform built with Angular on the frontend and an Express + TypeORM + PostgreSQL backend. The project is designed for a learning platform with role-based access, course catalog workflows, quizzes, learner progress tracking, and admin operations in a clean, production-oriented structure.

## Overview

This repository contains a full-stack application for managing online learning content and student activity. It combines:

- a responsive Angular frontend for students, teachers, and admins
- a secure Express API with PostgreSQL persistence
- TypeORM-based data modeling and migrations
- role-aware business logic and protected endpoints
- production-minded configuration for CORS, health checks, and security hardening

The solution is intended to be easy to run locally, simple to understand for contributors, and structured for future scaling.

## Features

- Course catalog and search flow
- Role-based access for students, teachers, and administrators
- Secure authentication and protected API routes
- Quiz and assessment support
- Learning progress tracking and reporting
- Admin user management and role assignment
- Health monitoring and deployment-ready backend configuration
- Responsive frontend with PrimeNG UI components
- PostgreSQL-backed relational data model

## Tech Stack

### Frontend
- Angular 22
- TypeScript
- PrimeNG
- PrimeFlex
- RxJS
- Angular Material components

### Backend
- Node.js 18+
- Express 4
- TypeORM
- PostgreSQL
- JWT-based authentication
- bcrypt password hashing
- Helmet + rate limiting for security hardening

## Project Structure

```text
Training_project/
├── backend/
│   ├── src/
│   ├── test/
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   └── README.md
├── Test Images/
├── .github/
├── .gitignore
├── README.md
└── package-lock.json (if present in repo root)
```

## Architecture

The application follows a clean client-server separation:

- Frontend: Angular app handles UI, user interaction, auth state, and API calls
- Backend: Express server exposes REST endpoints and centralizes business rules
- Database: PostgreSQL stores users, courses, progress, quizzes, and related learning data
- ORM: TypeORM helps keep entity definitions and schema changes consistent through migrations

This structure makes it easier to introduce new modules, enforce validation, and maintain a consistent API contract.

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- PostgreSQL installed and running
- A database user with permission to create schemas and tables

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Training_project.git
cd Training_project
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend` directory with configuration similar to:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=training_project
CORS_ORIGINS=http://localhost:4200,http://127.0.0.1:4200
PUBLIC_API_URL=http://localhost:3000
TRUST_PROXY_HOPS=0
```

For deployment, keep secrets in a secure environment manager or platform secret store instead of committing them into the repo.

### 4. Run database migrations

```bash
npm run migration:run
```

### 5. Start the backend

```bash
npm start
```

The backend runs in watch mode for local development with TypeScript support enabled.

### 6. Install frontend dependencies

Open a second terminal and run:

```bash
cd frontend
npm install
```

### 7. Start the frontend

```bash
npm start
```

Then open:

```text
http://localhost:4200/
```

## Production Build

### Backend build

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend build

```bash
cd frontend
npm run build
```

The frontend production build will generate artifacts in the `dist/` folder.

## Security Notes

This project has been hardened with a production-minded approach:

- Helmet for baseline HTTP security headers
- request rate limiting on public endpoints
- CORS configured for specific origins
- environment-driven proxy/trust settings
- secure handling of secrets and admin provisioning

Important:

- Do not commit production credentials
- Keep `TRUST_PROXY_HOPS` aligned with your reverse proxy setup
- Use strict origin allowlists in deployment environments
- Use PostgreSQL backups before running migrations in production

## Admin Setup

The first administrator should be created through the normal signup flow and then promoted from a trusted database session. This avoids creating an insecure admin bootstrap endpoint.

Example:

```sql
UPDATE public."User_table"
SET role = 'admin'
WHERE email = 'administrator@example.com';
```

## Health and Monitoring

The backend provides health endpoints for operational checks:

- `GET /health` for liveness
- `GET /health/ready` for readiness and database health

These are useful for container health checks, orchestration systems, and deployment validation.

## API and Development Docs

More detailed backend operational notes are available in:

- [backend/README.md](./backend/README.md)

Frontend-specific Angular guidance is available in:

- [frontend/README.md](./frontend/README.md)

## Recommended Next Steps

- Add automated test coverage for critical workflows
- Expand RBAC and permission validation across modules
- Add CI/CD pipelines for build and deployment checks
- Add stronger monitoring, logging, and alerting for production environments
- Review deployment configuration for production URL, HTTPS, and reverse proxy settings

## Project Status

This project is actively evolving toward a more production-ready course management application with stronger backend security, cleaner type-safe API flows, and modern Angular tooling.

## Contributing

Contributions are welcome. For larger changes, please open an issue or discuss the design before implementing substantial updates.

## Notes

This repository is intended as a practical full-stack learning platform and a strong base for continued development. The project name and package structure may be updated as the system grows, but the architecture is already organized for further feature work and deployment hardening.
