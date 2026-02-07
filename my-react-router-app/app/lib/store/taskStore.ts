import { create } from 'zustand';

interface TaskState {
    filterStatus: string | null;
    filterPriority: string | null;
    filterProjectId: string | null;
    setFilterStatus: (status: string | null) => void;
    setFilterPriority: (priority: string | null) => void;
    setFilterProjectId: (projectId: string | null) => void;
    resetFilters: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    filterStatus: null,
    filterPriority: null,
    filterProjectId: null,
    setFilterStatus: (status) => set({ filterStatus: status }),
    setFilterPriority: (priority) => set({ filterPriority: priority }),
    setFilterProjectId: (projectId) => set({ filterProjectId: projectId }),
    resetFilters: () => set({ filterStatus: null, filterPriority: null, filterProjectId: null }),
}));
