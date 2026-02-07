# Database Schema Design

## Overview
This document defines the database schema for the task management system using Drizzle ORM with Neon PostgreSQL.

## Database: Neon PostgreSQL
- **Provider**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle
- **Connection**: Via `DATABASE_URL` environment variable

---

## Tables

### 1. Users Table
Stores user account information and authentication data.

```typescript
users {
  id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
  email: varchar(255) UNIQUE NOT NULL
  name: varchar(255) NOT NULL
  password_hash: text NOT NULL
  avatar_url: text NULL
  created_at: timestamp DEFAULT now()
  updated_at: timestamp DEFAULT now()
}
```

**Indexes:**
- `idx_users_email` on `email` (for login lookups)

**Relationships:**
- One-to-many with `tasks` (user owns tasks)
- One-to-many with `projects` (user owns projects)

---

### 2. Projects Table
Organizes tasks into projects/categories.

```typescript
projects {
  id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
  name: varchar(255) NOT NULL
  description: text NULL
  color: varchar(7) DEFAULT '#3B82F6' // Hex color for UI
  user_id: uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
  created_at: timestamp DEFAULT now()
  updated_at: timestamp DEFAULT now()
}
```

**Indexes:**
- `idx_projects_user_id` on `user_id` (for user's projects lookup)

**Relationships:**
- Many-to-one with `users`
- One-to-many with `tasks`

---

### 3. Tasks Table
Core table for task management.

```typescript
tasks {
  id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
  title: varchar(500) NOT NULL
  description: text NULL
  status: varchar(50) DEFAULT 'todo' // 'todo', 'in_progress', 'completed'
  priority: varchar(50) DEFAULT 'medium' // 'low', 'medium', 'high', 'urgent'
  due_date: timestamp NULL
  completed_at: timestamp NULL
  user_id: uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
  project_id: uuid NULL REFERENCES projects(id) ON DELETE SET NULL
  created_at: timestamp DEFAULT now()
  updated_at: timestamp DEFAULT now()
}
```

**Indexes:**
- `idx_tasks_user_id` on `user_id`
- `idx_tasks_project_id` on `project_id`
- `idx_tasks_status` on `status` (for filtering)
- `idx_tasks_due_date` on `due_date` (for sorting)

**Relationships:**
- Many-to-one with `users`
- Many-to-one with `projects`
- One-to-many with `task_attachments`

**Constraints:**
- `status` CHECK constraint: value IN ('todo', 'in_progress', 'completed')
- `priority` CHECK constraint: value IN ('low', 'medium', 'high', 'urgent')

---

### 4. Task Attachments Table
Stores file attachments (images) for tasks via ImageKit.

```typescript
task_attachments {
  id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
  task_id: uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE
  file_url: text NOT NULL // ImageKit URL
  file_id: varchar(255) NOT NULL // ImageKit file ID for deletion
  file_name: varchar(255) NOT NULL
  file_type: varchar(100) NOT NULL // MIME type
  file_size: integer NOT NULL // Size in bytes
  uploaded_by: uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
  created_at: timestamp DEFAULT now()
}
```

**Indexes:**
- `idx_attachments_task_id` on `task_id`

**Relationships:**
- Many-to-one with `tasks`
- Many-to-one with `users` (uploader)

---

### 5. Better-Auth Tables
Better-Auth automatically creates and manages these tables:

#### session
```typescript
session {
  id: text PRIMARY KEY
  expiresAt: timestamp NOT NULL
  token: text NOT NULL UNIQUE
  createdAt: timestamp NOT NULL
  updatedAt: timestamp NOT NULL
  ipAddress: text
  userAgent: text
  userId: text NOT NULL REFERENCES user(id)
}
```

#### account
```typescript
account {
  id: text PRIMARY KEY
  accountId: text NOT NULL
  providerId: text NOT NULL
  userId: text NOT NULL REFERENCES user(id)
  accessToken: text
  refreshToken: text
  idToken: text
  accessTokenExpiresAt: timestamp
  refreshTokenExpiresAt: timestamp
  scope: text
  password: text
  createdAt: timestamp NOT NULL
  updatedAt: timestamp NOT NULL
}
```

#### verification
```typescript
verification {
  id: text PRIMARY KEY
  identifier: text NOT NULL
  value: text NOT NULL
  expiresAt: timestamp NOT NULL
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## Drizzle Schema Files Structure

```
backend/
└── src/
    └── db/
        ├── schema/
        │   ├── users.ts       # User table schema
        │   ├── projects.ts    # Projects table schema
        │   ├── tasks.ts       # Tasks table schema
        │   ├── attachments.ts # Attachments table schema
        │   └── index.ts       # Export all schemas
        ├── migrations/        # Auto-generated migrations
        ├── index.ts           # Database connection
        └── migrate.ts         # Migration runner
```

---

## Migrations

### Initial Migration
Will create all tables with proper relationships and constraints.

### Migration Commands
```bash
# Generate migration
npm run db:generate

# Run migrations
npm run db:migrate

# Push schema to database (development)
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

---

## Query Examples

### Get User's Tasks with Project Info
```typescript
const userTasks = await db
  .select()
  .from(tasks)
  .leftJoin(projects, eq(tasks.project_id, projects.id))
  .where(eq(tasks.user_id, userId))
  .orderBy(desc(tasks.created_at));
```

### Get Tasks by Status
```typescript
const todoTasks = await db
  .select()
  .from(tasks)
  .where(and(
    eq(tasks.user_id, userId),
    eq(tasks.status, 'todo')
  ))
  .orderBy(asc(tasks.due_date));
```

### Get Project with Task Count
```typescript
const projectsWithCount = await db
  .select({
    project: projects,
    taskCount: count(tasks.id)
  })
  .from(projects)
  .leftJoin(tasks, eq(projects.id, tasks.project_id))
  .where(eq(projects.user_id, userId))
  .groupBy(projects.id);
```

---

## Data Validation

### Task Status Enum
- `todo` - Task not started
- `in_progress` - Task currently being worked on
- `completed` - Task finished

### Task Priority Enum
- `low` - Low priority
- `medium` - Medium priority (default)
- `high` - High priority
- `urgent` - Urgent priority

---

## Performance Considerations

1. **Indexes**: Created on frequently queried columns (user_id, project_id, status, due_date)
2. **Cascading Deletes**: Automatic cleanup when users/projects are deleted
3. **Timestamps**: Automatic tracking of creation and updates
4. **Connection Pooling**: Neon provides built-in connection pooling
5. **Prepared Statements**: Drizzle uses prepared statements by default

---

## Security

1. **SQL Injection**: Prevented by Drizzle's query builder
2. **Password Storage**: Hashed via Better-Auth (bcrypt)
3. **UUID Primary Keys**: Prevents enumeration attacks
4. **Row-Level Security**: Enforced in application layer (user_id checks)