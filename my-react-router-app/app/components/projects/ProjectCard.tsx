import { useNavigate } from "react-router";

interface Project {
    id: string;
    name: string;
    description: string | null;
    color: string;
    createdAt: string;
}

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/projects/${project.id}`)}
            className="group p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer relative overflow-hidden"
        >
            <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: project.color }}
            />

            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                </h3>
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                />
            </div>

            {project.description && (
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {project.description}
                </p>
            )}

            <div className="flex items-center text-xs text-slate-400">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Created {new Date(project.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}
