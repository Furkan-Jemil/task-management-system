import { table, id, text, timestamp, createdAt } from '../utils';

/**
 * Verification table - stores email verification tokens for better-auth
 */
export const verification = table('verification', {
    id: id('id'),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: createdAt(),
});

export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;
