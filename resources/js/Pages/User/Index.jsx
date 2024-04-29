import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { USER_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP } from "@/constants";
import clsx from "clsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {};

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
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
        router.get(route("user.index"), queryParams);
    };

    const deleteUser = (id) => {
        if (!window.confirm("Are you sure you want to delete this user"))
            return;

        router.delete(route("user.destroy", id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
            {success && (
                <div
                    x-data="{ show: true }"
                    x-init="setTimeout(() => show = false, 3000)"
                    x-show="show"
                    className="text-emerald-500 text-center pt-5"
                >
                    {success}
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-600">
                            {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}

                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                                    <thead className="text-sm text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name={"id"}
                                                sortable={true}
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChange}
                                            >
                                                id
                                            </TableHeading>

                                            <TableHeading
                                                name={"name"}
                                                sortable={true}
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChange}
                                            >
                                                name
                                            </TableHeading>

                                            <TableHeading
                                                name={"email"}
                                                sortable={true}
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChange}
                                            >
                                                Email
                                            </TableHeading>

                                            <TableHeading
                                                name={"created_at"}
                                                sortable={true}
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChange}
                                            >
                                                Created Date
                                            </TableHeading>

                                            <TableHeading
                                                name={"actions"}
                                                sortable={false}
                                            >
                                                Actions
                                            </TableHeading>
                                        </tr>
                                    </thead>

                                    <thead className="text-sm text-white uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-4"></th>

                                            <th className="px-3 py-4">
                                                <TextInput
                                                    className="w-full text-black"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="User Name"
                                                    onBlur={(e) =>
                                                        searchFieldChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                            </th>

                                            <th className="px-3 py-4">
                                                <TextInput
                                                    className="w-full text-black"
                                                    defaultValue={
                                                        queryParams.email
                                                    }
                                                    placeholder="User Email"
                                                    onBlur={(e) =>
                                                        searchFieldChange(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("email", e)
                                                    }
                                                />
                                            </th>

                                            <th className="px-3 py-4"></th>
                                            <th className="px-3 py-4"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.data.map((user, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white dark:text-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td className="px-3 py-2 text-center">
                                                    {user.id}
                                                </td>

                                                <td className="px-3 py-2 text-gray-100 text-nowrap">
                                                    {user.name}
                                                </td>

                                                <td className="px-3 py-2">
                                                    {user.email}
                                                </td>

                                                <td className="px-3 py-2">
                                                    {user.created_at}
                                                </td>

                                                <td className="px-3 py-2 flex items-center justify-center gap-1">
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            user.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            deleteUser(user.id)
                                                        }
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
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
