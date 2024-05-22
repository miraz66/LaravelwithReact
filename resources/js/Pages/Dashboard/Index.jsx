import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashboardTable from "./DashbordTable";

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalInProgressTasks,
    myInProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
    activeTasks,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-amber-500 overflow-hidden shadow-xl shadow-gray-400 sm:rounded-lg">
                            <div className="p-6 text-gray-100 font-bold">
                                Pending Tasks
                                <div className="pt-2 text-3xl font-serif font-bold">
                                    <span>{myPendingTasks}</span>/
                                    <span>{totalPendingTasks}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-500 overflow-hidden shadow-xl shadow-gray-400 sm:rounded-lg">
                            <div className="p-6 text-gray-100 font-bold">
                                In Progress Tasks
                                <div className="pt-2 text-3xl font-serif font-bold">
                                    <span>{myInProgressTasks}</span>/
                                    <span>{totalInProgressTasks}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-500 overflow-hidden shadow-xl shadow-gray-400 sm:rounded-lg">
                            <div className="p-6 text-gray-100 font-bold">
                                Complete Tasks
                                <div className="pt-2 text-3xl font-serif font-bold">
                                    <span>{myCompletedTasks}</span>/
                                    <span>{totalCompletedTasks}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 overflow-hidden shadow-md shadow-gray-400 sm:rounded-lg">
                        <h1 className="text-4xl p-6 bg-gray-200 font-bold text-gray-700 tracking-tight">
                            My Active Tasks
                        </h1>

                        <DashboardTable activeTasks={activeTasks} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
