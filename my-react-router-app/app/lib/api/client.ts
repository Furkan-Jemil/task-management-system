import axios from 'axios';

/**
 * Axios instance configured for API requests to the backend server.
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Required for session-based auth
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
