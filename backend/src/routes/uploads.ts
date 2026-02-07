import { Router } from 'express';
import { db } from '../db';
import { taskAttachments } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { uploadService } from '../services/upload.service';
import { z } from 'zod';

const uploadsRouter = Router();

// All upload routes require authentication
uploadsRouter.use(authMiddleware);

const uploadSchema = z.object({
    file: z.string().min(1, "File data is required"),
    fileName: z.string().min(1, "File name is required"),
    taskId: z.string().uuid("Invalid task ID"),
    fileType: z.string(),
    fileSize: z.number(),
});

/**
 * GET /api/uploads/auth
 * Get authentication parameters for client-side ImageKit uploads
 */
uploadsRouter.get('/auth', (req, res) => {
    try {
        const params = uploadService.getAuthParams();
        res.json(params);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get upload auth' });
    }
});

/**
 * POST /api/uploads/image
 * Upload an image and save it as a task attachment
 */
uploadsRouter.post('/image', async (req, res) => {
    try {
        const user = (req as any).user;
        const { file, fileName, taskId, fileType, fileSize } = uploadSchema.parse(req.body);

        // 1. Upload to ImageKit
        const uploadResult = await uploadService.uploadImage(file, fileName);

        // 2. Save to database
        const [newAttachment] = await db.insert(taskAttachments).values({
            taskId,
            fileUrl: uploadResult.url,
            fileId: uploadResult.fileId,
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            uploadedBy: user.id,
        } as any).returning();

        res.status(201).json(newAttachment);
    } catch (error) {
        console.error('Upload route error:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        res.status(500).json({ message: 'Failed to upload image' });
    }
});

/**
 * DELETE /api/uploads/image/:id
 * Delete an attachment from database and ImageKit
 */
uploadsRouter.delete('/image/:id', async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;

        // 1. Get attachment details
        const attachment = await db.query.taskAttachments.findFirst({
            where: and(eq(taskAttachments.id, id), eq(taskAttachments.uploadedBy, user.id)),
        });

        if (!attachment) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        // 2. Delete from ImageKit
        await uploadService.deleteImage(attachment.fileId);

        // 3. Delete from database
        await db.delete(taskAttachments)
            .where(eq(taskAttachments.id, id));

        res.json({ message: 'Attachment deleted successfully' });
    } catch (error) {
        console.error('Delete attachment error:', error);
        res.status(500).json({ message: 'Failed to delete attachment' });
    }
});

export default uploadsRouter;
