import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { USER_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP } from "@/constants";
import clsx from "clsx";
import TaskTable from "../Tasks/TaskTable";

export default function Show({ auth, user, tasks, queryParams = null }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`User ${user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-400 bg-gray-800">
                            <img
                                className="w-full h-96"
                                src={user.image_path}
                                alt="fake image"
                            />
                            <div className="grid grid-cols-2 pt-10">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-lg font-bold">
                                            User ID
                                        </label>
                                        <p>{user.id}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            User Name
                                        </label>
                                        <p>{user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            User Status{"  "}
                                        </label>
                                        <span
                                            className={clsx(
                                                "px-3 p-1 text-white rounded-sm",
                                                USER_STATUS_CLASS_MAP[
                                                    user.status
                                                ]
                                            )}
                                        >
                                            {USER_STATUS_TEXT_MAP[user.status]}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created By
                                        </label>
                                        <p>{user.created_by.name}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-lg font-bold">
                                            Due Date
                                        </label>
                                        <p className="font-serif">
                                            {user.due_date}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created Date
                                        </label>
                                        <p className="font-serif">
                                            {user.created_at}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Updated By
                                        </label>
                                        <p>{user.updated_by.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 space-y-2">
                                <label className="text-lg font-bold">
                                    User description
                                </label>
                                <p>{user.description}</p>
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
                                    routeId={user.id}
                                    routeName={"user.show"}
                                    hideUserColumn={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </AuthenticatedLayout>
    );
}
