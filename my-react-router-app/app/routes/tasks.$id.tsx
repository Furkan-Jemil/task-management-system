import { useNavigate, useParams } from "react-router";
import { useTask, useUpdateTask, useDeleteTask } from "../lib/hooks/useTasks";
import { format } from "date-fns";
import Button from "../components/ui/Button";
import FileUpload from "../components/ui/FileUpload";
import { useQueryClient } from "@tanstack/react-query";
import { uploadsApi } from "../lib/api/uploads";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: task, isLoading, isError } = useTask(id as string);
    const updateMutation = useUpdateTask();
    const deleteMutation = useDeleteTask();

    if (isLoading) return <div className="p-8 text-center animate-pulse">Loading task details...</div>;
    if (isError || !task) return <div className="p-8 text-center text-red-500">Task not found</div>;

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this task?")) {
            await deleteMutation.mutateAsync(task.id);
            navigate("/tasks");
        }
    };

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateMutation.mutateAsync({ id: task.id, data: { status: e.target.value } });
    };

    const handleDeleteAttachment = async (attachmentId: string) => {
        try {
            await uploadsApi.deleteAttachment(attachmentId);
            queryClient.invalidateQueries({ queryKey: ["tasks", task.id] });
        } catch (error) {
            alert("Failed to delete attachment");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-600`}>
                                {task.priority} priority
                            </span>
                            {task.project && (
                                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: task.project.color }} />
                                    {task.project.name}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{task.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate("/tasks")}>Back</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="col-span-2 p-6 space-y-8">
                        <section>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Description</h3>
                            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                {task.description || "No description provided."}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Attachments</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {task.attachments?.map((att: any) => (
                                    <div key={att.id} className="group relative aspect-video bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                                        <img
                                            src={att.fileUrl}
                                            alt={att.fileName}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteAttachment(att.id)}
                                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transform scale-90 group-hover:scale-100 transition-transform"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <FileUpload
                                taskId={task.id}
                                onSuccess={() => queryClient.invalidateQueries({ queryKey: ["tasks", task.id] })}
                            />
                        </section>
                    </div>

                    <div className="p-6 bg-slate-50 space-y-8">
                        <section>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Status</h3>
                            <select
                                value={task.status}
                                onChange={handleStatusChange}
                                className="w-full h-11 bg-white border border-slate-200 rounded-lg px-4 font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </section>

                        <section className="space-y-4">
                            <div>
                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</h4>
                                <p className="font-semibold text-slate-900">
                                    {task.dueDate ? format(new Date(task.dueDate), 'MMMM d, yyyy') : "No due date"}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Created At</h4>
                                <p className="text-sm text-slate-500 font-medium">
                                    {format(new Date(task.createdAt), 'MMM d, yyyy • h:mm a')}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
