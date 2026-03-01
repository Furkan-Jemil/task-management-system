import { table, id, foreignId, text, timestamp, createdAt, updatedAt } from '../utils';
import { users } from './users';

/**
 * Account table - stores OAuth/external account connections for better-auth
 */
export const account = table('account', {
    id: id('id'),
    userId: foreignId('user_id', () => users.id),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    password: text('password'),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    expiresAt: timestamp('expires_at'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
