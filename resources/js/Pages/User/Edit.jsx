import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth, user }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        image_path: user.image_path || "",
        name: user.name || "",
        status: user.status || "",
        due_date: user.due_date || "",
        description: user.description || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.update", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Your {user.name} User.
                    </h2>
                </div>
            }
        >
            <Head title="Add New User" />
            <div className="py-12 dark:bg-gray-800 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-4 ">
                    <div className="bg-white overflow-hidden dark:bg-gray-700 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-300">
                            <h1 className="text-center font-medium text-3xl py-2 transform">
                                Edit Your User.
                            </h1>
                            <form className="space-y-6" onSubmit={onSubmit}>
                                {/*  Create a new user from image */}
                                <div>
                                    <InputLabel
                                        className="text-white text-lg font-medium"
                                        htmlFor="user_image_path"
                                        value="User Image"
                                    />

                                    <TextInput
                                        id="user_image_path"
                                        name="image"
                                        type="file"
                                        isFocused="true"
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

                                {/* Create a new User from Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="User Name"
                                    />

                                    <TextInput
                                        id="name"
                                        name="Name"
                                        type="text"
                                        placeholder="User Name"
                                        value={data.name}
                                        isFocused="true"
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

                                {/* Create a new User from Due Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="due_date"
                                        value="User Due Date"
                                    />

                                    <TextInput
                                        id="due_date"
                                        name="due_date"
                                        type="date"
                                        placeholder="User Due Date"
                                        isFocused="true"
                                        value={data.due_date}
                                        className="mt-1 block text-gray-900 w-full"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new User from Status */}
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="User Status"
                                    />

                                    <SelectInput
                                        id="status"
                                        name="status"
                                        type="text"
                                        placeholder="User Status"
                                        isFocused="true"
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

                                {/* Create a new User from Description */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="User Description"
                                    />

                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        type="text"
                                        rows="06"
                                        placeholder="User Description"
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
                                        // href={route("user.index")}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <SecondaryButton
                                        type="submit"
                                        className="bg-emerald-600 border-emerald-600 hover:bg-emerald-500"
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
