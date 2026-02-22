import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { projects } from './projects';

/**
 * Task status enum values
 */
export const taskStatusEnum = ['todo', 'in_progress', 'completed'] as const;
export type TaskStatus = (typeof taskStatusEnum)[number];

/**
 * Task priority enum values
 */
export const taskPriorityEnum = ['low', 'medium', 'high', 'urgent'] as const;
export type TaskPriority = (typeof taskPriorityEnum)[number];

/**
 * Tasks table - core task management
 */
export const tasks = pgTable('tasks', {
    id: text('id').primaryKey(),
    title: varchar('title', { length: 500 }).notNull(),
    description: text('description'),
    status: varchar('status', { length: 50 }).default('todo').notNull(),
    priority: varchar('priority', { length: 50 }).default('medium').notNull(),
    dueDate: timestamp('due_date'),
    completedAt: timestamp('completed_at'),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
