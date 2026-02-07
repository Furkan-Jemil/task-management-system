import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50 text-slate-400">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <p className="font-medium font-black tracking-widest uppercase text-xs">Syncing Session...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1e293b',
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                    },
                }}
            />
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <Header />
                <main className="flex-1 p-10 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
