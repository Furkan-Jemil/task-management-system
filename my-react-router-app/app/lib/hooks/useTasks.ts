import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';

export function useTasks(filters: { status?: string; projectId?: string; priority?: string } = {}) {
    return useQuery({
        queryKey: ['tasks', filters],
        queryFn: () => tasksApi.getAll(filters),
    });
}

export function useTask(id: string) {
    return useQuery({
        queryKey: ['tasks', id],
        queryFn: () => tasksApi.getById(id),
        enabled: !!id,
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: tasksApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => tasksApi.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['tasks', id] });
        },
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: tasksApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}
