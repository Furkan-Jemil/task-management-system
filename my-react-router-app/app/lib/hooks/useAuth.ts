import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/auth';

/**
 * Hook to manage and verify user authentication state.
 * Syncs the local auth store with the backend session.
 */
export function useAuth() {
    const navigate = useNavigate();
    const { user, setUser, setAuthenticated, setLoading, isLoading } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const session = await authApi.getSession();
                if (session && session.user) {
                    setUser(session.user);
                    setAuthenticated(true);
                } else {
                    setUser(null);
                    setAuthenticated(false);
                }
            } catch (err) {
                setUser(null);
                setAuthenticated(false);
            } finally {
                setLoading(false);
                setIsChecking(false);
            }
        }

        if (isChecking) {
            checkSession();
        }
    }, [setUser, setAuthenticated, setLoading, isChecking]);

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            setUser(null);
            setAuthenticated(false);
            navigate('/login');
        }
    };

    return { user, isLoading: isLoading || isChecking, logout, checkSession: () => setIsChecking(true) };
}
