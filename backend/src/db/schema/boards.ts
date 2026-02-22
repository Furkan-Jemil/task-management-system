import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';

/**
 * Boards table - organizes tasks into lists within a workspace
 */
export const boards = pgTable('boards', {
    id: text('id').primaryKey(),
    workspaceId: text('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Board = typeof boards.$inferSelect;
export type NewBoard = typeof boards.$inferInsert;
