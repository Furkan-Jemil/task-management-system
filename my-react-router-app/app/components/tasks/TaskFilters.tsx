import { useTaskStore } from "../../lib/store/taskStore";
import { useProjects } from "../../lib/hooks/useProjects";

export default function TaskFilters() {
    const {
        filterStatus, setFilterStatus,
        filterPriority, setFilterPriority,
        filterProjectId, setFilterProjectId,
        searchQuery, setSearchQuery,
        resetFilters
    } = useTaskStore();

    const { data: projects } = useProjects();

    return (
        <div className="flex flex-wrap items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            {/* Search Input */}
            <div className="flex-1 min-w-[240px] relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">🔍</span>
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    className="w-full h-11 bg-slate-50 border-none rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Status</label>
                    <select
                        className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 min-w-[140px]"
                        value={filterStatus || ''}
                        onChange={(e) => setFilterStatus(e.target.value || null)}
                    >
                        <option value="">All Statuses</option>
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Priority</label>
                    <select
                        className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 min-w-[140px]"
                        value={filterPriority || ''}
                        onChange={(e) => setFilterPriority(e.target.value || null)}
                    >
                        <option value="">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Project</label>
                    <select
                        className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 min-w-[140px]"
                        value={filterProjectId || ''}
                        onChange={(e) => setFilterProjectId(e.target.value || null)}
                    >
                        <option value="">No Project</option>
                        {projects?.map((project: any) => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                </div>

                {(filterStatus || filterPriority || filterProjectId || searchQuery) && (
                    <button
                        onClick={resetFilters}
                        className="h-11 px-4 text-sm font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-2 transition-colors mt-auto"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
}
