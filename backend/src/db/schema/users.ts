import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Users table - stores user account information
 */
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }),
    password: text('password').notNull(),
    emailVerified: timestamp('email_verified'),
    image: text('image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
