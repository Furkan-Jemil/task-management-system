import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Session table - stores user sessions for better-auth
 */
export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

import { users } from './users';

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
