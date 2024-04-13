import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

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
                        <div className="p-6 text-gray-900">
                            {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                                <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Image</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">
                                            Create Date
                                        </th>
                                        <th className="px-3 py-2">Due Date</th>
                                        <th className="px-3 py-2">Create By</th>
                                        <th className="px-3 py-2">Actions</th>
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
                                                    style={{ width: 100 }}
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

                                            <td className="px-3 py-2"></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
