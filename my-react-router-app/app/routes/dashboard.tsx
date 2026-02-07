import { useTasks } from "../lib/hooks/useTasks";
import { useProjects } from "../lib/hooks/useProjects";
import { format } from "date-fns";
import { NavLink } from "react-router";

export default function Dashboard() {
    const { data: tasks, isLoading: tasksLoading } = useTasks();
    const { data: projects, isLoading: projectsLoading } = useProjects();

    const stats = {
        total: tasks?.length || 0,
        todo: tasks?.filter((t: any) => t.status === 'todo').length || 0,
        inProgress: tasks?.filter((t: any) => t.status === 'in_progress').length || 0,
        completed: tasks?.filter((t: any) => t.status === 'completed').length || 0,
    };

    const upcomingTasks = tasks
        ?.filter((t: any) => t.status !== 'completed' && t.dueDate)
        ?.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        ?.slice(0, 5);

    const recentProjects = projects?.slice(0, 4);

    if (tasksLoading || projectsLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-64 bg-slate-200 rounded-xl"></div>
                    <div className="h-64 bg-slate-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back!</h1>
                <p className="mt-1 text-slate-500 font-medium">Here's what's happening with your projects today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Tasks</div>
                    <div className="text-3xl font-black text-slate-900">{stats.total}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-indigo-500 text-xs font-bold uppercase tracking-widest mb-2">To Do</div>
                    <div className="text-3xl font-black text-slate-900">{stats.todo}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-2">In Progress</div>
                    <div className="text-3xl font-black text-slate-900">{stats.inProgress}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">Completed</div>
                    <div className="text-3xl font-black text-slate-900">{stats.completed}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Upcoming Tasks */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-900 text-lg">Upcoming Deadlines</h2>
                        <NavLink to="/tasks" className="text-xs font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-widest">View All</NavLink>
                    </div>
                    <div className="flex-1 divide-y divide-slate-50">
                        {upcomingTasks?.length ? (
                            upcomingTasks.map((task: any) => (
                                <NavLink
                                    key={task.id}
                                    to={`/tasks/${task.id}`}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group"
                                >
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <span className="font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{task.title}</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{task.project?.name || "No Project"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${new Date(task.dueDate) < new Date() ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {format(new Date(task.dueDate), 'MMM d')}
                                        </span>
                                    </div>
                                </NavLink>
                            ))
                        ) : (
                            <div className="p-10 text-center text-slate-400 italic text-sm">No upcoming deadlines! Relax ☕</div>
                        )}
                    </div>
                </section>

                {/* Recent Projects */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-900 text-lg">Recent Projects</h2>
                        <NavLink to="/dashboard" className="text-xs font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-widest">View All</NavLink>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        {recentProjects?.length ? (
                            recentProjects.map((project: any) => (
                                <div key={project.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-100 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                                        <span className="font-bold text-slate-900 text-sm truncate">{project.name}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                        {project.description || "No description set for this project."}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 p-4 text-center text-slate-400 italic text-sm">No projects created yet.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
