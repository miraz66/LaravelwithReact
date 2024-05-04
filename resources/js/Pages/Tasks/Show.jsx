import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants";
import clsx from "clsx";
// import TaskTable from "../Tasks/TaskTable";

export default function Show({ auth, task }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Task ${task.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-400 bg-gray-800">
                            <img
                                className="w-full h-96"
                                src={task.image_path}
                                alt="fake image"
                            />
                            <div className="grid grid-cols-2 pt-10">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-lg font-bold">
                                            Task ID
                                        </label>
                                        <p>{task.id}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold block">
                                            Task Name
                                        </label>
                                        <p>{task.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Task Status{"  "}
                                        </label>
                                        <span
                                            className={clsx(
                                                "px-3 p-1 text-white rounded-sm",
                                                TASK_STATUS_CLASS_MAP[
                                                    task.status
                                                ]
                                            )}
                                        >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created By
                                        </label>
                                        <p>{task.created_by.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Priority
                                        </label>
                                        <p>{task.priority}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-lg font-bold">
                                            Due Date
                                        </label>
                                        <p className="font-serif">
                                            {task.due_date}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created Date
                                        </label>
                                        <p className="font-serif">
                                            {task.created_at}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold block">
                                            Project Name
                                        </label>
                                        <Link
                                            href={route(
                                                "project.show",
                                                task.project.id
                                            )}
                                            className="hover:underline"
                                        >
                                            {task.name}
                                        </Link>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Updated By
                                        </label>
                                        <p>{task.updated_by.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 space-y-2">
                                <label className="text-lg font-bold">
                                    Task description
                                </label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
