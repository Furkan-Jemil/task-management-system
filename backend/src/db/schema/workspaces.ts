import { pgTable, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { users } from './users';

/**
 * Workspaces table - organizes projects/boards into multi-tenant containers
 */
export const workspaces = pgTable('workspaces', {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    ownerId: text('owner_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Workspace = typeof workspaces.$inferSelect;
export type NewWorkspace = typeof workspaces.$inferInsert;
