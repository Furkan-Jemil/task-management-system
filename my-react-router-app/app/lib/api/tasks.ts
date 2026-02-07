import apiClient from './client';

export const tasksApi = {
    /**
     * Fetch all tasks with optional filters
     */
    getAll: async (filters: { status?: string; projectId?: string; priority?: string } = {}) => {
        const response = await apiClient.get('/tasks', { params: filters });
        return response.data;
    },

    /**
     * Create a new task
     */
    create: async (data: any) => {
        const response = await apiClient.post('/tasks', data);
        return response.data;
    },

    /**
     * Get task details
     */
    getById: async (id: string) => {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    },

    /**
     * Update a task
     */
    update: async (id: string, data: any) => {
        const response = await apiClient.patch(`/tasks/${id}`, data);
        return response.data;
    },

    /**
     * Delete a task
     */
    delete: async (id: string) => {
        const response = await apiClient.delete(`/tasks/${id}`);
        return response.data;
    },
};
