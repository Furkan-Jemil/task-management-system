# Task Management System - Technical Overview

## Project Summary
A full-stack task management application built with modern technologies, featuring authentication, real-time state management, and cloud-based image storage.

## Tech Stack

### Frontend
- **React Router v7** - Modern full-stack React framework with SSR
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe development
- **TailwindCSS v4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management and caching
- **Axios** - HTTP client for API requests

### Backend
- **Express.js** - Node.js web application framework
- **Better-Auth** - Modern authentication library
- **Drizzle ORM** - TypeScript-first ORM
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **ImageKit** - Image CDN and storage service

## Architecture Overview

### Monorepo Structure
```
task-management/
├── backend/                 # Express.js API server (to be created)
├── my-react-router-app/    # React Router frontend
├── shared/                  # Shared types and utilities (to be created)
└── .env                     # Root environment variables
```

### Frontend Architecture
- **React Router v7** with file-based routing
- **Server-Side Rendering (SSR)** for improved performance and SEO
- **Client-side state** managed by Zustand
- **Server state** cached and synchronized via TanStack Query
- **Type-safe** API calls with TypeScript

### Backend Architecture
- **RESTful API** with Express.js
- **Database ORM** using Drizzle with Neon PostgreSQL
- **Authentication** via Better-Auth (session-based)
- **Image uploads** handled by ImageKit
- **CORS** configured for frontend communication

## Key Features (Planned)

### Authentication
- User registration and login
- Session-based authentication with Better-Auth
- Protected routes on frontend and backend
- User profile management

### Task Management
- Create, read, update, delete (CRUD) tasks
- Task categories/projects
- Task priorities and due dates
- Task status tracking (todo, in-progress, completed)
- Task assignments (multi-user support)

### Image Management
- Upload task attachments via ImageKit
- Image optimization and CDN delivery
- Thumbnail generation

### Real-time Features
- Optimistic updates with TanStack Query
- Automatic cache invalidation
- Background data synchronization

## Database Schema (Planned)

### Users Table
- id, email, name, password_hash, avatar_url
- created_at, updated_at

### Tasks Table
- id, title, description, status, priority
- due_date, user_id (owner), project_id
- created_at, updated_at

### Projects Table
- id, name, description, color
- user_id (owner), created_at, updated_at

### Task Attachments Table
- id, task_id, file_url, file_type
- uploaded_by, created_at

## API Endpoints (Planned)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

### Tasks
- `GET /api/tasks` - List all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Uploads
- `POST /api/uploads/image` - Upload image to ImageKit
- `DELETE /api/uploads/image/:id` - Delete image

## Environment Configuration

### Backend (.env)
- `DATABASE_URL` - Neon PostgreSQL connection string
- `BETTERAUTH_SECRET` - Authentication secret key
- `BETTERAUTH_URL` - Auth service URL
- `IMAGEKIT_PUBLIC_KEY` - ImageKit public key
- `IMAGEKIT_PRIVATE_KEY` - ImageKit private key
- `IMAGEKIT_URL_ENDPOINT` - ImageKit CDN endpoint
- `PORT` - Server port (5000)
- `NODE_ENV` - Environment mode
- `ALLOWED_ORIGINS` - CORS allowed origins

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_IMAGEKIT_PUBLIC_KEY` - ImageKit public key (client-side)
- `VITE_IMAGEKIT_URL_ENDPOINT` - ImageKit endpoint

## Development Workflow

### Starting the Application
1. **Backend**: `cd backend && npm run dev`
2. **Frontend**: `cd my-react-router-app && npm run dev`

### Building for Production
1. **Backend**: `cd backend && npm run build`
2. **Frontend**: `cd my-react-router-app && npm run build`

## Security Considerations
- Environment variables for sensitive data
- CORS configuration for API security
- Session-based authentication
- SQL injection prevention via Drizzle ORM
- Input validation on both client and server
- Secure password hashing with Better-Auth