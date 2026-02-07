import { useState } from "react";
import { useTasks } from "../lib/hooks/useTasks";
import { useTaskStore } from "../lib/store/taskStore";
import TaskList from "../components/tasks/TaskList";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import Button from "../components/ui/Button";

export default function Tasks() {
    const [isAdding, setIsAdding] = useState(false);
    const { filterStatus, filterPriority, filterProjectId } = useTaskStore();

    const { data: tasks, isLoading, isError } = useTasks({
        status: filterStatus || undefined,
        priority: filterPriority || undefined,
        projectId: filterProjectId || undefined,
    });

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
                    <p className="mt-1 text-slate-500">Manage and organize your day-to-day work.</p>
                </div>
                <Button onClick={() => setIsAdding(true)} className="h-11 px-6 text-sm font-bold shadow-indigo-100 shadow-xl">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Task
                </Button>
            </div>

            <div className="mb-8">
                <TaskFilters />
            </div>

            {isAdding && (
                <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-indigo-50 animate-in fade-in zoom-in duration-300">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Task</h2>
                    <TaskForm onSuccess={() => setIsAdding(false)} onCancel={() => setIsAdding(false)} />
                </div>
            )}

            {isError ? (
                <div className="p-8 bg-red-50 rounded-xl border border-red-100 text-center">
                    <h3 className="text-red-900 font-bold mb-2">Failed to load tasks</h3>
                    <p className="text-red-700">Please try again later or contact support if the issue persists.</p>
                </div>
            ) : (
                <TaskList tasks={tasks || []} />
            )}
        </div>
    );
}
