import apiClient from './client';

export const projectsApi = {
    /**
     * Fetch all projects
     */
    getAll: async () => {
        const response = await apiClient.get('/projects');
        return response.data;
    },

    /**
     * Create a new project
     */
    create: async (data: any) => {
        const response = await apiClient.post('/projects', data);
        return response.data;
    },

    /**
     * Get project details
     */
    getById: async (id: string) => {
        const response = await apiClient.get(`/projects/${id}`);
        return response.data;
    },

    /**
     * Update a project
     */
    update: async (id: string, data: any) => {
        const response = await apiClient.patch(`/projects/${id}`, data);
        return response.data;
    },

    /**
     * Delete a project
     */
    delete: async (id: string) => {
        const response = await apiClient.delete(`/projects/${id}`);
        return response.data;
    },
};
