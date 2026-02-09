import apiClient from './client';

/**
 * Authentication API calls using Better-Auth endpoints (proxied via Express).
 */
export const authApi = {
    /**
     * Register a new user
     */
    register: async (data: any) => {
        const response = await apiClient.post('/auth/sign-up/email', data);
        return response.data;
    },

    /**
     * Login user
     */
    login: async (data: any) => {
        const response = await apiClient.post('/auth/sign-in/email', data);
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async () => {
        const response = await apiClient.post('/auth/sign-out');
        return response.data;
    },

    /**
     * Get current session/user
     */
    getSession: async () => {
        const response = await apiClient.get('/auth/get-session');
        return response.data;
    },
};
