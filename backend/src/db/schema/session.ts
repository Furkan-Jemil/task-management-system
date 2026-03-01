import { table, foreignId, text, timestamp, createdAt, updatedAt } from '../utils';
import { users } from './users';

/**
 * Session table - stores user sessions for better-auth
 */
export const session = table('session', {
    id: text('id').primaryKey(),
    userId: foreignId('user_id', () => users.id),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
