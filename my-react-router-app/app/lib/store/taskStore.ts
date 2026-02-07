import { create } from 'zustand';

interface TaskState {
    filterStatus: string | null;
    filterPriority: string | null;
    filterProjectId: string | null;
    searchQuery: string;
    setFilterStatus: (status: string | null) => void;
    setFilterPriority: (priority: string | null) => void;
    setFilterProjectId: (projectId: string | null) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    filterStatus: null,
    filterPriority: null,
    filterProjectId: null,
    searchQuery: '',
    setFilterStatus: (status) => set({ filterStatus: status }),
    setFilterPriority: (priority) => set({ filterPriority: priority }),
    setFilterProjectId: (projectId) => set({ filterProjectId: projectId }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    resetFilters: () => set({ filterStatus: null, filterPriority: null, filterProjectId: null, searchQuery: '' }),
}));
