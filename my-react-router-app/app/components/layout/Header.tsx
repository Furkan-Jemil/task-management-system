import { useAuth } from "../../lib/hooks/useAuth";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                {/* Breadcrumbs or search can go here */}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{user?.email}</span>
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
}
