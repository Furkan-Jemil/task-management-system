import apiClient from './client';

/**
 * Authentication API calls using Better-Auth endpoints (proxied via Express).
 */
export const authApi = {
    /**
     * Register a new user
     */
    register: async (data: any) => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    /**
     * Login user
     */
    login: async (data: any) => {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    /**
     * Get current session/user
     */
    getSession: async () => {
        const response = await apiClient.get('/auth/session');
        return response.data;
    },
};
