import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth, task, projects, users }) {
    const { data, setData, post, errors, reset } = useForm({
        image_path: task.image_path || "",
        project_id: task.project_id || "",
        image: "",
        name: task.name || "",
        due_date: task.due_date || "",
        status: task.status || "",
        priority: task.priority || "",
        assigned_user_id: task.assigned_user_id || "",
        description: task.description || "",
        _method: "PUT",
    });

    console.log(task.id);

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.update", task.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Your {task.name} Task.
                    </h2>
                </div>
            }
        >
            <Head title="Add New Task" />
            <div className="py-12 dark:bg-gray-800 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-4 ">
                    <div className="bg-white overflow-hidden dark:bg-gray-700 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-300">
                            <h1 className="text-center font-medium text-3xl py-2 transform">
                                Edit Your Task.
                            </h1>
                            <form className="space-y-6" onSubmit={onSubmit}>
                                {/* Create a new Task from Project Id */}
                                <div>
                                    <InputLabel
                                        htmlFor="task_project_id"
                                        value="Project"
                                    />

                                    <SelectInput
                                        id="task_project_id"
                                        name="project_id"
                                        value={data.project_id}
                                        className="mt-1 block w-full py-2"
                                        onChange={(e) =>
                                            setData(
                                                "project_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select Project</option>
                                        {projects.data.map((project) => (
                                            <option
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        message={errors.project_id}
                                        className="mt-2"
                                    />
                                </div>

                                {/*  Create a new task from image */}
                                <div>
                                    <InputLabel
                                        className="text-white text-lg font-medium"
                                        htmlFor="task_image_path"
                                        value="Task Image"
                                    />

                                    <TextInput
                                        id="task_image_path"
                                        name="image"
                                        type="file"
                                        className="mt-1 py-1.5 px-2 block w-full bg-gray-400 border-black"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />

                                    {data.image_path && (
                                        <img
                                            className="w-52 m-4"
                                            src={data.image_path}
                                            alt="edit image"
                                        />
                                    )}
                                </div>

                                {/* Create a new Task from Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Task Name"
                                    />

                                    <TextInput
                                        id="name"
                                        name="Name"
                                        type="text"
                                        placeholder="Task Name"
                                        value={data.name}
                                        className="mt-1 block w-full text-gray-900"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new Task from Due Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="due_date"
                                        value="Task Due Date"
                                    />

                                    <TextInput
                                        id="due_date"
                                        name="due_date"
                                        type="date"
                                        placeholder="Task Due Date"
                                        value={data.due_date}
                                        className="mt-1 block text-gray-900 w-full "
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new Task from Status */}
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Task Status"
                                    />

                                    <SelectInput
                                        id="status"
                                        name="status"
                                        type="text"
                                        placeholder="Task Status"
                                        value={data.status}
                                        className="mt-1 block w-full py-2"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new Task from Priority */}
                                <div>
                                    <InputLabel
                                        htmlFor="priority"
                                        value="Task Priority"
                                    />

                                    <SelectInput
                                        id="priority"
                                        name="priority"
                                        type="text"
                                        placeholder="Task priority"
                                        value={data.priority}
                                        className="mt-1 block w-full py-2"
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select Priority
                                        </option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError
                                        message={errors.priority}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new Task from Assigned User */}
                                <div>
                                    <InputLabel
                                        htmlFor="task_assigned_user"
                                        value="Assigned User"
                                    />

                                    <SelectInput
                                        name="assigned_user_id"
                                        id="task_assigned_user"
                                        value={data.assigned_user_id}
                                        className="mt-1 block w-full py-2"
                                        onChange={(e) =>
                                            setData(
                                                "assigned_user_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select User</option>

                                        {users.data.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        message={errors.assigned_user_id}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new Task from Description */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Task Description"
                                    />

                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        type="text"
                                        rows="06"
                                        placeholder="Task Description"
                                        isFocused="true"
                                        value={data.description}
                                        className="mt-1 block w-full text-gray-900"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Submit or Cancel Button */}
                                <div className="flex justify-end gap-5">
                                    <Link
                                        href={route("task.index")}
                                        className="inline-flex items-center px-8 py-3 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <SecondaryButton
                                        type="submit"
                                        className="bg-emerald-600 border-emerald-600 hover:bg-emerald-500 px-24"
                                    >
                                        Submit
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
