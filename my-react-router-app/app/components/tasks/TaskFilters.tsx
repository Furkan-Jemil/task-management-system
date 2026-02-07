import { useTaskStore } from "../../lib/store/taskStore";
import { useProjects } from "../../lib/hooks/useProjects";

export default function TaskFilters() {
    const {
        filterStatus, setFilterStatus,
        filterPriority, setFilterPriority,
        filterProjectId, setFilterProjectId,
        resetFilters
    } = useTaskStore();

    const { data: projects } = useProjects();

    return (
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
                <select
                    className="text-sm border-none bg-slate-50 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-500"
                    value={filterStatus || ''}
                    onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                    <option value="">All Statuses</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                <select
                    className="text-sm border-none bg-slate-50 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-500"
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

            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project</label>
                <select
                    className="text-sm border-none bg-slate-50 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-indigo-500"
                    value={filterProjectId || ''}
                    onChange={(e) => setFilterProjectId(e.target.value || null)}
                >
                    <option value="">All Projects</option>
                    {projects?.map((project: any) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>

            {(filterStatus || filterPriority || filterProjectId) && (
                <button
                    onClick={resetFilters}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 ml-auto"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );
}
