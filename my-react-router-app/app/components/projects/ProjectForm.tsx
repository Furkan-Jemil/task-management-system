import { useState } from 'react';
import { useCreateProject, useUpdateProject } from '../../lib/hooks/useProjects';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ProjectFormProps {
    initialData?: any;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const COLORS = [
    '#4F46E5', '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#06B6D4', '#6366F1', '#14B8A6'
];

export default function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [color, setColor] = useState(initialData?.color || COLORS[0]);
    const [error, setError] = useState('');

    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();

    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (initialData?.id) {
                await updateMutation.mutateAsync({
                    id: initialData.id,
                    data: { name, description, color }
                });
            } else {
                await createMutation.mutateAsync({ name, description, color });
            }
            onSuccess?.();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <Input
                label="Project Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Website Redesign"
            />

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this project about?"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Project Color</label>
                <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-slate-900 scale-110' : 'border-transparent'
                                }`}
                            style={{ backgroundColor: c }}
                            title={c}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" isLoading={isLoading}>
                    {initialData?.id ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
}
