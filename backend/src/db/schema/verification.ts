import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Verification table - stores email verification tokens for better-auth
 */
export const verification = pgTable('verification', {
    id: uuid('id').primaryKey().defaultRandom(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;
