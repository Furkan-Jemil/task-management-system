import { Router } from "express";
import { db } from "../db";
import { projects } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

const projectsRouter = Router();

// All project routes require authentication
projectsRouter.use(authMiddleware);

const projectSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format").default("#4F46E5"),
});

/**
 * GET /api/projects
 * List all projects for the authenticated user
 */
projectsRouter.get("/", async (req, res) => {
    try {
        const user = (req as any).user;
        const userProjects = await db.query.projects.findMany({
            where: eq(projects.userId, user.id),
            orderBy: projects.createdAt,
        });
        res.json(userProjects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});

/**
 * POST /api/projects
 * Create a new project
 */
projectsRouter.post("/", async (req, res) => {
    try {
        const user = (req as any).user;
        const body = projectSchema.parse(req.body);

        const [newProject] = await db.insert(projects).values({
            ...body,
            userId: user.id,
        }).returning();

        res.status(201).json(newProject);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation failed", errors: error.errors });
        }
        res.status(500).json({ message: "Failed to create project" });
    }
});

/**
 * GET /api/projects/:id
 * Get details of a single project
 */
projectsRouter.get("/:id", async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;

        const project = await db.query.projects.findFirst({
            where: and(eq(projects.id, id), eq(projects.userId, user.id)),
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch project" });
    }
});

/**
 * PATCH /api/projects/:id
 * Update a project
 */
projectsRouter.patch("/:id", async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;
        const body = projectSchema.partial().parse(req.body);

        const [updatedProject] = await db.update(projects)
            .set({ ...body, updatedAt: new Date() })
            .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
            .returning();

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(updatedProject);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation failed", errors: error.errors });
        }
        res.status(500).json({ message: "Failed to update project" });
    }
});

/**
 * DELETE /api/projects/:id
 * Delete a project
 */
projectsRouter.delete("/:id", async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;

        const [deletedProject] = await db.delete(projects)
            .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
            .returning();

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete project" });
    }
});

export default projectsRouter;
