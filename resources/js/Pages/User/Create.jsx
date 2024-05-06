import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(data);
        post(route("user.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Add New User.
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
                                Add New User.
                            </h1>
                            <form className="space-y-6" onSubmit={onSubmit}>
                                {/* Create a new User from User Name */}
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

                                {/* Create a new User from email */}

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        className="mt-1 block w-full text-gray-900"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new User from password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={data.password}
                                        className="mt-1 block w-full text-gray-900"
                                        autoComplete="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Create a new User from password_confirmation */}
                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="password_confirmation"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Confirm Password"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full text-gray-900"
                                        autoComplete="password_confirmation"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <p>
                                    mirajulislam0509@gmail.com,
                                    plm@246800#QAZ+"MNBVCXZ&asdfghjkl"(0509)
                                </p>

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
                                        className="bg-emerald-600 border-emerald-600 hover:bg-emerald-500 px-20 py-3"
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
