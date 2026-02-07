import { useProjects } from "../lib/hooks/useProjects";
import ProjectList from "../components/projects/ProjectList";

export default function Projects() {
    const { data: projects, isLoading, isError } = useProjects();

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    <p className="text-slate-500 font-medium italic">Loading projects...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 bg-red-50 rounded-xl border border-red-100 text-center">
                <h3 className="text-red-900 font-bold text-lg mb-2">Error loading projects</h3>
                <p className="text-red-700">Please try refreshing the page or contact support if the problem persists.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-10 block">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Projects Dashboard</h1>
                <p className="mt-2 text-slate-600 text-lg">Organize your work into manageable projects and keep track of your goals.</p>
            </header>

            <ProjectList projects={projects || []} />
        </div>
    );
}
