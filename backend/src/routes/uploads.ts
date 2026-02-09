import { Router } from 'express';
import { db } from '../db';
import { taskAttachments } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { uploadService } from '../services/upload.service';
import { z } from 'zod';
import { calculateHash, sanitizeFileName } from '../utils/hash';

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
uploadsRouter.get('/auth', (_req, res) => {
    try {
        const params = uploadService.getAuthParams();
        return res.json(params);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get upload auth' });
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

        // 1. Sanitize filename
        const sanitizedName = sanitizeFileName(fileName);

        // 2. Calculate hash for deduplication
        const fileHash = calculateHash(file);

        // 3. Check for existing attachment with the same hash
        const existingAttachment = await db.query.taskAttachments.findFirst({
            where: eq(taskAttachments.fileHash, fileHash),
        });

        let uploadResult;
        let attachmentData;

        if (existingAttachment) {
            // Use existing file details but create NEW record for THIS task
            attachmentData = {
                taskId,
                fileUrl: existingAttachment.fileUrl,
                fileId: existingAttachment.fileId,
                fileName: sanitizedName,
                fileType: fileType,
                fileSize: fileSize,
                fileHash: fileHash,
                uploadedBy: user.id,
            };
        } else {
            // 4. Upload to ImageKit if not found
            uploadResult = await uploadService.uploadImage(file, sanitizedName);
            attachmentData = {
                taskId,
                fileUrl: uploadResult.url,
                fileId: uploadResult.fileId,
                fileName: sanitizedName,
                fileType: fileType,
                fileSize: fileSize,
                fileHash: fileHash,
                uploadedBy: user.id,
            };
        }

        // 5. Save to database
        const [newAttachment] = await db.insert(taskAttachments).values(attachmentData as any).returning();

        return res.status(201).json(newAttachment);
    } catch (error) {
        console.error('Upload route error:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }
        return res.status(500).json({ message: 'Failed to upload image' });
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

        return res.json({ message: 'Attachment deleted successfully' });
    } catch (error) {
        console.error('Delete attachment error:', error);
        return res.status(500).json({ message: 'Failed to delete attachment' });
    }
});

export default uploadsRouter;
