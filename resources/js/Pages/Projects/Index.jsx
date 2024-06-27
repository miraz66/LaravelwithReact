import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";
import clsx from "clsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
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
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (id) => {
    if (!window.confirm("Are you sure you want to delete this project")) return;

    router.delete(route("project.destroy", id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
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
              {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                  <thead className="text-sm text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      {/* Table Heading ID */}
                      <TableHeading
                        name={"id"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        id
                      </TableHeading>

                      {/* Table Heading image */}
                      <TableHeading name={"image"} sortable={false}>
                        image
                      </TableHeading>

                      <TableHeading
                        name={"name"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        name
                      </TableHeading>

                      {/* Table Heading status */}
                      <TableHeading
                        name={"status"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        status
                      </TableHeading>

                      {/* Table Heading created_at */}
                      <TableHeading
                        name={"created_at"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        created Date
                      </TableHeading>

                      {/* Table Heading due_date */}
                      <TableHeading
                        name={"due_date"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        due Date
                      </TableHeading>

                      {/* Table Heading created_by */}
                      <TableHeading name={"created_by"} sortable={false}>
                        created By
                      </TableHeading>

                      {/* Table Heading actions */}
                      <TableHeading name={"actions"} sortable={false}>
                        actions
                      </TableHeading>
                    </tr>
                  </thead>

                  <thead className="text-sm text-white uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-4"></th>
                      <th className="px-3 py-4"></th>
                      <th className="px-3 py-4">
                        <TextInput
                          className="w-full text-black"
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={(e) => searchFieldChange(e.target.value)}
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="">
                        <SelectInput
                          defaultValue={queryParams.status}
                          className="w-full"
                          onChange={(e) =>
                            searchFieldChange("status", e.target.value)
                          }
                        >
                          <option>Select Status</option>
                          <option value="completed">Completed</option>
                          <option value="in_progress">In Progress</option>
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
                    {projects.data.map((project, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:text-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {/* Project Table ID */}
                        <td className="px-3 py-2 text-center">{project.id}</td>

                        {/* Project Table Image */}
                        <td className="px-3 py-2">
                          <img
                            className="rounded"
                            src={project.image_path}
                            alt="Project image"
                            style={{ width: 120 }}
                          />
                        </td>

                        {/* Project Table Name */}
                        <td className="px-3 py-2 hover:underline hover:text-gray-300 ease-in-out duration-200">
                          <Link href={route("project.show", project.id)}>
                            {project.name}
                          </Link>
                        </td>

                        {/* Project Table Status */}
                        <td className="px-3 py-2">
                          <span
                            className={clsx(
                              "px-3 p-1 text-white rounded-sm",
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            )}
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>

                        {/* Project Table created_at */}
                        <td className="px-3 py-2">{project.created_at}</td>

                        {/* Project Table due_date */}
                        <td className="px-3 py-2">{project.due_date}</td>

                        {/* Project Table created_by */}
                        <td className="px-3 py-2">{project.updated_by.name}</td>

                        {/* Project Table actions */}
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center gap-1">
                            <Link
                              href={route("project.edit", project.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
