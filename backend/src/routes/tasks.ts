import { Router } from "express";
import { db } from "../db";
import { tasks, taskStatusEnum, taskPriorityEnum } from "../db/schema";
import { eq, and, or } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

const tasksRouter = Router();

// All task routes require authentication
tasksRouter.use(authMiddleware);

const taskSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().optional(),
    status: z.enum(taskStatusEnum.enumValues).default("todo"),
    priority: z.enum(taskPriorityEnum.enumValues).default("medium"),
    dueDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
    projectId: z.string().uuid().optional(),
});

/**
 * GET /api/tasks
 * List tasks for the authenticated user with optional filters
 */
tasksRouter.get("/", async (req, res) => {
    try {
        const user = (req as any).user;
        const { status, projectId, priority } = req.query;

        const conditions = [eq(tasks.userId, user.id)];

        if (status) conditions.push(eq(tasks.status, status as any));
        if (projectId) conditions.push(eq(tasks.projectId, projectId as string));
        if (priority) conditions.push(eq(tasks.priority, priority as any));

        const userTasks = await db.query.tasks.findMany({
            where: and(...conditions),
            orderBy: tasks.createdAt,
            with: {
                project: true
            }
        });

        res.json(userTasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

/**
 * POST /api/tasks
 * Create a new task
 */
tasksRouter.post("/", async (req, res) => {
    try {
        const user = (req as any).user;
        const body = taskSchema.parse(req.body);

        const [newTask] = await db.insert(tasks).values({
            ...body,
            userId: user.id,
        } as any).returning();

        res.status(201).json(newTask);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation failed", errors: error.errors });
        }
        res.status(500).json({ message: "Failed to create task" });
    }
});

/**
 * GET /api/tasks/:id
 * Get single task details
 */
tasksRouter.get("/:id", async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;

        const task = await db.query.tasks.findFirst({
            where: and(eq(tasks.id, id), eq(tasks.userId, user.id)),
            with: {
                project: true,
                attachments: true
            }
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch task" });
    }
});

/**
 * PATCH /api/tasks/:id
 * Update a task
 */
tasksRouter.patch("/:id", async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;
        const body = taskSchema.partial().parse(req.body);

        const [updatedTask] = await db.update(tasks)
            .set({
                ...body,
                updatedAt: new Date(),
                completedAt: body.status === 'completed' ? new Date() : undefined
            } as any)
            .where(and(eq(tasks.id, id), eq(tasks.userId, user.id)))
            .returning();

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation failed", errors: error.errors });
        }
        res.status(500).json({ message: "Failed to update task" });
    }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
tasksRouter.delete("/:id", async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;

        const [deletedTask] = await db.delete(tasks)
            .where(and(eq(tasks.id, id), eq(tasks.userId, user.id)))
            .returning();

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
    }
});

export default tasksRouter;
