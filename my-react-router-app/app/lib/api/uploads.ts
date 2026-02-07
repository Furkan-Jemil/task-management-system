import apiClient from './client';

export const uploadsApi = {
    /**
     * Upload an image to the backend as a task attachment
     * Encodes the file to base64 before sending
     */
    uploadImage: async (file: File, taskId: string) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result as string;
                try {
                    const response = await apiClient.post('/uploads/image', {
                        file: base64,
                        fileName: file.name,
                        taskId,
                        fileType: file.type,
                        fileSize: file.size,
                    });
                    resolve(response.data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = error => reject(error);
        });
    },

    /**
     * Delete an attachment
     */
    deleteAttachment: async (id: string) => {
        const response = await apiClient.delete(`/uploads/image/${id}`);
        return response.data;
    },

    /**
     * Get ImageKit authentication parameters
     */
    getAuthParams: async () => {
        const response = await apiClient.get('/uploads/auth');
        return response.data;
    },
};
