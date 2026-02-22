import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Session table - stores user sessions for better-auth
 */
export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
});

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
