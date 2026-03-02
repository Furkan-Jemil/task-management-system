import { table, id, varchar, text, boolean, createdAt, updatedAt } from '../utils';

/**
 * Users table - stores user account information
 */
export const users = table('users', {
    id: id('id'),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
