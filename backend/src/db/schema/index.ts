import { relations } from 'drizzle-orm';
import { users } from './users';
import { projects } from './projects';
import { tasks } from './tasks';
import { taskAttachments } from './attachments';

/**
 * Define relationships between tables
 */

// User relations
export const usersRelations = relations(users, ({ many }) => ({
    projects: many(projects),
    tasks: many(tasks),
    uploadedAttachments: many(taskAttachments),
}));

// Project relations
export const projectsRelations = relations(projects, ({ one, many }) => ({
    owner: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
    tasks: many(tasks),
}));

// Task relations
export const tasksRelations = relations(tasks, ({ one, many }) => ({
    owner: one(users, {
        fields: [tasks.userId],
        references: [users.id],
    }),
    project: one(projects, {
        fields: [tasks.projectId],
        references: [projects.id],
    }),
    attachments: many(taskAttachments),
}));

// Task attachment relations
export const taskAttachmentsRelations = relations(taskAttachments, ({ one }) => ({
    task: one(tasks, {
        fields: [taskAttachments.taskId],
        references: [tasks.id],
    }),
    uploader: one(users, {
        fields: [taskAttachments.uploadedBy],
        references: [users.id],
    }),
}));

/**
 * Export all schemas
 */
export { users } from './users';
export { projects } from './projects';
export { tasks, taskStatusEnum, taskPriorityEnum } from './tasks';
export { taskAttachments } from './attachments';

export type { User, NewUser } from './users';
export type { Project, NewProject } from './projects';
export type { Task, NewTask, TaskStatus, TaskPriority } from './tasks';
export type { TaskAttachment, NewTaskAttachment } from './attachments';
