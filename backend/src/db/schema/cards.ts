import { pgTable, varchar, text, integer, pgEnum, timestamp, date } from 'drizzle-orm/pg-core';
import { lists } from './lists';

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

/**
 * Cards table - individual tasks within a list
 */
export const cards = pgTable('cards', {
    id: text('id').primaryKey(),
    listId: text('list_id')
        .notNull()
        .references(() => lists.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    priority: priorityEnum('priority').default('medium').notNull(),
    dueDate: date('due_date'),
    position: integer('position').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;
