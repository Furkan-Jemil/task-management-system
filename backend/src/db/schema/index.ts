import { relations } from 'drizzle-orm';
import { users } from './users';
import { workspaces } from './workspaces';
import { workspaceMembers } from './workspace_members';
import { boards } from './boards';
import { lists } from './lists';
import { cards } from './cards';
import { session } from './session';
import { account } from './account';
import { verification } from './verification';

/**
 * Define relationships between tables
 */

// User relations
export const usersRelations = relations(users, ({ many }) => ({
    memberships: many(workspaceMembers),
    ownedWorkspaces: many(workspaces),
    sessions: many(session),
    accounts: many(account),
}));

// Workspace relations
export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
    owner: one(users, {
        fields: [workspaces.ownerId],
        references: [users.id],
    }),
    members: many(workspaceMembers),
    boards: many(boards),
}));

// Workspace Member relations
export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
    workspace: one(workspaces, {
        fields: [workspaceMembers.workspaceId],
        references: [workspaces.id],
    }),
    user: one(users, {
        fields: [workspaceMembers.userId],
        references: [users.id],
    }),
}));

// Board relations
export const boardsRelations = relations(boards, ({ one, many }) => ({
    workspace: one(workspaces, {
        fields: [boards.workspaceId],
        references: [workspaces.id],
    }),
    lists: many(lists),
}));

// List relations
export const listsRelations = relations(lists, ({ one, many }) => ({
    board: one(boards, {
        fields: [lists.boardId],
        references: [boards.id],
    }),
    cards: many(cards),
}));

// Card relations
export const cardsRelations = relations(cards, ({ one }) => ({
    list: one(lists, {
        fields: [cards.listId],
        references: [lists.id],
    }),
}));

/**
 * Export all schemas
 */
export * from './users';
export * from './workspaces';
export * from './workspace_members';
export * from './boards';
export * from './lists';
export * from './cards';
export * from './session';
export * from './account';
export * from './verification';
export * from './projects';
export * from './tasks';
export * from './attachments';
