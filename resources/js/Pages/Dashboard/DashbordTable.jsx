// import Pagination from "@/Components/Pagination";
import clsx from "clsx";

import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants";

export default function DashboardTable({ activeTasks }) {
    console.log(activeTasks);
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                    <thead className="text-sm text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-4">ID</th>
                            <th className="px-3 py-4">Project Name</th>
                            <th className="px-3 py-4">Name</th>
                            <th className="px-3 py-4">Status</th>
                            <th className="px-3 py-4">Created at</th>
                            <th className="px-3 py-4">Due Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activeTasks.data.map((task, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-nowrap"
                            >
                                <td className="px-3 py-2 text-center">
                                    {task.id}
                                </td>
                                <td className="px-3 py-2">
                                    {task.project.name}
                                </td>

                                <td className="px-3 py-2">{task.name}</td>

                                <td className="px-3 py-2">
                                    <span
                                        className={clsx(
                                            "px-3 p-1 text-white rounded-sm",
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        )}
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>

                                <td className="px-3 py-2">{task.created_at}</td>
                                <td className="px-3 py-2">{task.due_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <Pagination links={activeTasks.meta.links} /> */}
        </>
    );
}
