# Task Management System

A professional, full-stack task management application built with a modern technology stack.

## Tech Stack

### Frontend
- **React Router v7**: Modern full-stack React framework.
- **Vite**: Ultra-fast build tool and dev server.
- **TailwindCSS**: Utility-first CSS styling.
- **Zustand**: Lightweight state management.
- **TanStack Query**: Server state management and caching.
- **Axios**: HTTP client for API communication.

### Backend
- **Express.js**: Fast, unopinionated, minimalist web framework.
- **Drizzle ORM**: TypeScript-first ORM for type-safe database interactions.
- **Neon PostgreSQL**: Serverless PostgreSQL database.
- **Better-Auth**: Modern authentication solution.
- **ImageKit**: Cloud-based image management and optimization.

## Project Structure

```text
├── backend/                # Express API & Drizzle ORM
├── my-react-router-app/    # React Router v7 Frontend
├── database.md             # Database schema documentation
├── system.md               # Technical architecture overview
└── .gitignore              # Project-wide git exclusions
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Neon recommended)
- ImageKit Account

### Installation

1. Clone the repository.
2. Setup environment variables in a `.env` file at the root (see `system.md` for requirements).

#### Backend Setup
```bash
cd backend
npm install
npm run db:push    # Push schema to database
npm run dev        # Start development server
```

#### Frontend Setup
```bash
cd my-react-router-app
npm install
npm run dev        # Start development server
```

## Documentation
- [Architecture Overview](system.md)
- [Database Schema](database.md)

## License
MIT
