import { pgTable, pgEnum, timestamp, text } from 'drizzle-orm/pg-core';
import { users } from './users';
import { workspaces } from './workspaces';

export const roleEnum = pgEnum('role', ['owner', 'member']);

/**
 * Workspace members table - maps users to workspaces with roles
 */
export const workspaceMembers = pgTable('workspace_members', {
    id: text('id').primaryKey(),
    workspaceId: text('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    role: roleEnum('role').default('member').notNull(),
    joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

export type WorkspaceMember = typeof workspaceMembers.$inferSelect;
export type NewWorkspaceMember = typeof workspaceMembers.$inferInsert;
