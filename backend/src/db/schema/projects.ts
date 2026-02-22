import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

/**
 * Projects table - organizes tasks into projects/categories
 */
export const projects = pgTable('projects', {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    color: varchar('color', { length: 7 }).default('#3B82F6').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
