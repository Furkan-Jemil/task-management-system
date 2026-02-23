import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Account table - stores OAuth/external account connections for better-auth
 */
export const account = pgTable('account', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    password: text('password'),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

import { users } from './users';

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
