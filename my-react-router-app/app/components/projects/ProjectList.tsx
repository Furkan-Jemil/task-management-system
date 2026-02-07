import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import Button from "../ui/Button";

interface ProjectListProps {
    projects: any[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Your Projects</h2>
                <Button onClick={() => setIsAdding(true)} variant="primary" className="h-9 text-sm">
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Project
                </Button>
            </div>

            {isAdding && (
                <div className="p-6 bg-white rounded-xl shadow-sm border border-indigo-100 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-semibold mb-6 text-slate-900">Create New Project</h3>
                    <ProjectForm
                        onSuccess={() => setIsAdding(false)}
                        onCancel={() => setIsAdding(false)}
                    />
                </div>
            )}

            {projects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No projects yet</h3>
                        <p className="text-slate-500 mb-6 max-w-xs mx-auto">
                            Ready to get started? Create your first project to begin organizing your tasks.
                        </p>
                        {!isAdding && (
                            <Button onClick={() => setIsAdding(true)} variant="outline">
                                Create First Project
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
