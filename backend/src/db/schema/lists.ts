import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { boards } from './boards';

/**
 * Lists table - columns within a board (e.g. To Do, In Progress, Done)
 */
export const lists = pgTable('lists', {
    id: uuid('id').primaryKey().defaultRandom(),
    boardId: uuid('board_id')
        .notNull()
        .references(() => boards.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    position: integer('position').notNull(),
});

export type List = typeof lists.$inferSelect;
export type NewList = typeof lists.$inferInsert;
