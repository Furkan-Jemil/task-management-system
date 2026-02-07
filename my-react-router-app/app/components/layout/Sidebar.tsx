import { useNavigate, NavLink } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth";

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const navItems = [
        { name: 'Dashboard', to: '/dashboard', icon: '📊' },
        { name: 'Projects', to: '/projects', icon: '📁' },
        { name: 'Tasks', to: '/tasks', icon: '✅' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        A
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Antigravity</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                                ? 'bg-indigo-600 text-white'
                                : 'hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors font-medium"
                >
                    <span>🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
