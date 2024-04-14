import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-600">
                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                                <thead className="text-sm text-white uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-4">ID</th>
                                        <th className="px-3 py-4">Image</th>
                                        <th className="px-3 py-4">Name</th>
                                        <th className="px-3 py-4">Status</th>
                                        <th className="px-3 py-4">
                                            Create Date
                                        </th>
                                        <th className="px-3 py-4">Due Date</th>
                                        <th className="px-3 py-4">Create By</th>
                                        <th className="px-3 py-4 text-end">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2 text-center">
                                                {project.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                <img
                                                    src={project.image_path}
                                                    alt="fake image"
                                                    style={{ width: 120 }}
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.name}
                                            </td>

                                            <td className="px-3 py-2">
                                                {project.status}
                                            </td>

                                            <td className="px-3 py-2">
                                                {project.created_at}
                                            </td>

                                            <td className="px-3 py-2">
                                                {project.due_date}
                                            </td>

                                            <td className="px-3 py-2">
                                                {project.updated_by.name}
                                            </td>

                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route(
                                                        "project.edit",
                                                        project.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "project.destroy",
                                                        project.id
                                                    )}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}