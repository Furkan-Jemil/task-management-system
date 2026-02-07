import { imagekit } from '../config/imagekit';

export const uploadService = {
    /**
     * Upload a base64 encoded image to ImageKit
     */
    uploadImage: async (fileBase64: string, fileName: string, folder: string = '/task-attachments') => {
        try {
            const response = await (imagekit.upload({
                file: fileBase64,
                fileName: fileName,
                folder: folder,
            }) as any);
            return response;
        } catch (error) {
            console.error('ImageKit upload error:', error);
            throw new Error('Failed to upload image to ImageKit');
        }
    },

    /**
     * Delete an image from ImageKit
     */
    deleteImage: async (fileId: string) => {
        try {
            await imagekit.deleteFile(fileId);
        } catch (error) {
            console.error('ImageKit deletion error:', error);
            throw new Error('Failed to delete image from ImageKit');
        }
    },

    /**
     * Get authentication parameters for ImageKit client-side uploads
     */
    getAuthParams: () => {
        return imagekit.getAuthenticationParameters();
    },
};
