import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { useUpdateTask } from '../../lib/hooks/useTasks';

interface TaskCardProps {
    task: any;
}

const PRIORITY_COLORS: Record<string, string> = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
};

const STATUS_ICONS: Record<string, string> = {
    todo: '⭕',
    in_progress: '⏳',
    completed: '✅',
};

const navigate = useNavigate();

const handleToggleStatus = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    await updateMutation.mutateAsync({ id: task.id, data: { status: nextStatus } });
};

return (
    <div
        onClick={() => navigate(`/tasks/${task.id}`)}
        className={`p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer ${task.status === 'completed' ? 'opacity-75' : ''}`}
    >
        <div className="flex items-start gap-3">
            <button
                onClick={handleToggleStatus}
                className="mt-1 text-xl hover:scale-110 transition-transform"
            >
                {STATUS_ICONS[task.status] || '•'}
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold text-slate-900 truncate ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                        {task.title}
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${PRIORITY_COLORS[task.priority]}`}>
                        {task.priority}
                    </span>
                </div>

                {task.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center gap-3 text-xs text-slate-400">
                    {task.project && (
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.project.color }} />
                            <span>{task.project.name}</span>
                        </div>
                    )}

                    {task.dueDate && (
                        <div className="flex items-center gap-1">
                            <span>📅 {format(new Date(task.dueDate), 'MMM d')}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}
