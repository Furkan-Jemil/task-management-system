import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: any[];
}

export default function TaskList({ tasks }: TaskListProps) {
    const groupedTasks = {
        todo: tasks.filter(t => t.status === 'todo'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        completed: tasks.filter(t => t.status === 'completed'),
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Todo Column */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        To Do
                    </h3>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {groupedTasks.todo.length}
                    </span>
                </div>
                <div className="space-y-3">
                    {groupedTasks.todo.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {groupedTasks.todo.length === 0 && (
                        <div className="p-4 border-2 border-dashed border-slate-100 rounded-lg text-center text-xs text-slate-400 italic">
                            No tasks to do
                        </div>
                    )}
                </div>
            </div>

            {/* In Progress Column */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        In Progress
                    </h3>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {groupedTasks.in_progress.length}
                    </span>
                </div>
                <div className="space-y-3">
                    {groupedTasks.in_progress.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {groupedTasks.in_progress.length === 0 && (
                        <div className="p-4 border-2 border-dashed border-slate-100 rounded-lg text-center text-xs text-slate-400 italic">
                            No tasks in progress
                        </div>
                    )}
                </div>
            </div>

            {/* Completed Column */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Completed
                    </h3>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {groupedTasks.completed.length}
                    </span>
                </div>
                <div className="space-y-3">
                    {groupedTasks.completed.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {groupedTasks.completed.length === 0 && (
                        <div className="p-4 border-2 border-dashed border-slate-100 rounded-lg text-center text-xs text-slate-400 italic">
                            No completed tasks
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
