import { pgTable, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { tasks } from './tasks';
import { users } from './users';

/**
 * Task attachments table - stores file attachments for tasks
 */
export const taskAttachments = pgTable('task_attachments', {
    id: text('id').primaryKey(),
    taskId: text('task_id')
        .notNull()
        .references(() => tasks.id, { onDelete: 'cascade' }),
    fileUrl: text('file_url').notNull(),
    fileId: varchar('file_id', { length: 255 }).notNull(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 100 }).notNull(),
    fileSize: integer('file_size').notNull(),
    fileHash: varchar('file_hash', { length: 255 }),
    uploadedBy: text('uploaded_by')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type TaskAttachment = typeof taskAttachments.$inferSelect;
export type NewTaskAttachment = typeof taskAttachments.$inferInsert;
