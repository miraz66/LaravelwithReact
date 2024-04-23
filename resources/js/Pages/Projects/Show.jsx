import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";
import clsx from "clsx";
import TaskTable from "../Tasks/TaskTable";

export default function Show({ auth, project, tasks, queryParams = null }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Project ${project.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-400 bg-gray-800">
                            <img
                                className="w-full h-96"
                                src={project.image_path}
                                alt="fake image"
                            />
                            <div className="grid grid-cols-2 pt-10">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-lg font-bold">
                                            Project ID
                                        </label>
                                        <p>{project.id}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Project Name
                                        </label>
                                        <p>{project.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Project Status{"  "}
                                        </label>
                                        <span
                                            className={clsx(
                                                "px-3 p-1 text-white rounded-sm",
                                                PROJECT_STATUS_CLASS_MAP[
                                                    project.status
                                                ]
                                            )}
                                        >
                                            {
                                                PROJECT_STATUS_TEXT_MAP[
                                                    project.status
                                                ]
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created By
                                        </label>
                                        <p>{project.created_by.name}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-lg font-bold">
                                            Due Date
                                        </label>
                                        <p className="font-serif">
                                            {project.due_date}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created Date
                                        </label>
                                        <p className="font-serif">
                                            {project.created_at}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Updated By
                                        </label>
                                        <p>{project.updated_by.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 space-y-2">
                                <label className="text-lg font-bold">
                                    Project description
                                </label>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {tasks.data.length !== 0 ? (
                <div className="pb-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-4 ">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-400 bg-gray-800">
                                <TaskTable
                                    queryParams={queryParams}
                                    tasks={tasks}
                                    routeId={project.id}
                                    routeName={"project.show"}
                                    hideProjectColumn={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </AuthenticatedLayout>
    );
}
