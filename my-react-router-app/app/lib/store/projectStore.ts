import { create } from 'zustand';

interface ProjectsState {
    selectedProjectId: string | null;
    setSelectedProjectId: (id: string | null) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
    selectedProjectId: null,
    setSelectedProjectId: (id) => set({ selectedProjectId: id }),
}));
