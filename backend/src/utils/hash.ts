import { createHash } from 'crypto';

/**
 * Calculate SHA-256 hash of a base64 string
 */
export const calculateHash = (base64String: string): string => {
    // Remove data:image/...;base64, prefix if present
    const cleanBase64 = base64String.replace(/^data:.*?;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    return createHash('sha256').update(buffer).digest('hex');
};

/**
 * Sanitize filename to prevent directory traversal and other attacks
 */
export const sanitizeFileName = (fileName: string): string => {
    // Remove path components and keep only the filename
    const basename = fileName.split(/[\\/]/).pop() || 'unnamed';
    // Remove non-alphanumeric characters except dots and dashes
    return basename.replace(/[^a-zA-Z0-9.-]/g, '_');
};
