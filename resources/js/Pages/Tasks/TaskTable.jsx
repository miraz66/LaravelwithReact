import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import clsx from "clsx";

import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants";

export default function TaskTable({
    tasks,
    queryParams,
    routeName,
    routeId = null,
    hideProjectColumn = false,
}) {
    queryParams = queryParams || {};

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route(routeName, routeId), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChange(name, e.target.value);
    };

    const sortChange = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route(routeName, routeId), queryParams);
    };

    const deleteTask = (id) => {
        if (!window.confirm("Are you sure you want to delete this project"))
            return;

        router.delete(route("task.destroy", id));
    };

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                    <thead className="text-sm text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name={"id"}
                                sortable={true}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                id
                            </TableHeading>
                            <TableHeading name={"image"} sortable={false}>
                                image
                            </TableHeading>
                            {!hideProjectColumn && (
                                <TableHeading
                                    name={"Project Name"}
                                    sortable={false}
                                >
                                    Project Name
                                </TableHeading>
                            )}
                            <TableHeading
                                name={"name"}
                                sortable={true}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                name
                            </TableHeading>

                            <TableHeading
                                name={"status"}
                                sortable={true}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                status
                            </TableHeading>

                            <TableHeading
                                name={"created_at"}
                                sortable={true}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                created Date
                            </TableHeading>

                            <TableHeading
                                name={"due_date"}
                                sortable={true}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                due Date
                            </TableHeading>
                            <TableHeading name={"created_by"} sortable={false}>
                                created By
                            </TableHeading>

                            <TableHeading name={"actions"} sortable={false}>
                                actions
                            </TableHeading>
                        </tr>
                    </thead>

                    <thead className="text-sm text-white uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-4"></th>
                            <th className="px-3 py-4"></th>
                            {!hideProjectColumn && (
                                <th className="px-3 py-4"></th>
                            )}

                            <th className="px-3 py-4">
                                <TextInput
                                    className="w-full text-black"
                                    defaultValue={queryParams.name}
                                    placeholder="Task Name"
                                    onBlur={(e) =>
                                        searchFieldChange(e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th>
                                <SelectInput
                                    defaultValue={queryParams.status}
                                    className="w-full"
                                    onChange={(e) =>
                                        searchFieldChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>Select Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="pending">Pending</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-4"></th>
                            <th className="px-3 py-4"></th>
                            <th className="px-3 py-4"></th>
                            <th className="px-3 py-4"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.data.map((task, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-nowrap"
                            >
                                <td className="px-3 py-2 text-center">
                                    {task.id}
                                </td>
                                <td className="px-3 py-2">
                                    <img
                                        src={task.image_path}
                                        alt="fake image"
                                        style={{ width: 120 }}
                                    />
                                </td>
                                {!hideProjectColumn && (
                                    <td className="px-3 py-2">
                                        <Link
                                            href={route("task.show", task.id)}
                                        >
                                            {task.project.name}
                                        </Link>
                                    </td>
                                )}
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

                                <td className="px-3 py-2">
                                    {task.updated_by.name}
                                </td>

                                <td className="px-3 py-2">
                                    <Link
                                        href={route("task.edit", task.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
}
