import { useState } from "react";
import { useTasks } from "../lib/hooks/useTasks";
import { useTaskStore } from "../lib/store/taskStore";
import TaskList from "../components/tasks/TaskList";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import Button from "../components/ui/Button";

export default function Tasks() {
    const [isAdding, setIsAdding] = useState(false);
    const { filterStatus, filterPriority, filterProjectId, searchQuery } = useTaskStore();

    const { data: tasks, isLoading, isError } = useTasks({
        status: filterStatus || undefined,
        priority: filterPriority || undefined,
        projectId: filterProjectId || undefined,
    });

    // Client-side search filtering
    const filteredTasks = tasks?.filter((task: any) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    <p className="text-slate-500 font-medium italic">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tasks</h1>
                    <p className="mt-2 text-slate-500 font-medium text-lg">Manage and organize your day-to-day work.</p>
                </div>
                <Button onClick={() => setIsAdding(true)} className="h-12 px-8 text-sm font-black shadow-indigo-200 shadow-2xl rounded-xl transition-all hover:scale-105 active:scale-95">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    New Task
                </Button>
            </div>

            <TaskFilters />

            {isAdding && (
                <div className="p-8 bg-white rounded-3xl shadow-2xl border border-indigo-50 animate-in fade-in zoom-in duration-500">
                    <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        Create New Task
                    </h2>
                    <TaskForm onSuccess={() => setIsAdding(false)} onCancel={() => setIsAdding(false)} />
                </div>
            )}

            {isError ? (
                <div className="p-12 bg-red-50 rounded-3xl border-2 border-dashed border-red-100 text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h3 className="text-red-900 font-black text-xl mb-2">Failed to load tasks</h3>
                    <p className="text-red-700 font-medium">Please try again later or contact support if the issue persists.</p>
                </div>
            ) : (
                <TaskList tasks={filteredTasks} />
            )}
        </div>
    );
}
