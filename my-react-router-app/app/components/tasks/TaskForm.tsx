import { useState } from 'react';
import { useCreateTask, useUpdateTask } from '../../lib/hooks/useTasks';
import { useProjects } from '../../lib/hooks/useProjects';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

interface TaskFormProps {
    projectId?: string;
    initialData?: any;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function TaskForm({ projectId, initialData, onSuccess, onCancel }: TaskFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'todo');
    const [priority, setPriority] = useState(initialData?.priority || 'medium');
    const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
    const [selectedProjectId, setSelectedProjectId] = useState(projectId || initialData?.projectId || '');
    const [error, setError] = useState('');

    const { data: projects } = useProjects();
    const createMutation = useCreateTask();
    const updateMutation = useUpdateTask();

    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const payload = {
            title,
            description,
            status,
            priority,
            dueDate: dueDate || undefined,
            projectId: selectedProjectId || undefined,
        };

        try {
            if (initialData?.id) {
                await updateMutation.mutateAsync({ id: initialData.id, data: payload });
                toast.success('Task updated successfully');
            } else {
                await createMutation.mutateAsync(payload);
                toast.success('Task created successfully');
            }
            onSuccess?.();
        } catch (err: any) {
            const message = err.response?.data?.message || 'Something went wrong';
            setError(message);
            toast.error(message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <Input
                label="Task Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Finish the implementation plan..."
            />

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Details about this task..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">Priority</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">Due Date</label>
                    <input
                        type="date"
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Project (Optional)</label>
                <select
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                    <option value="">No Project</option>
                    {projects?.map((p: any) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" isLoading={isLoading}>
                    {initialData?.id ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
}
