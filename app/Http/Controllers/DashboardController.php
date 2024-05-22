<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Task Status
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalInProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        // Active tasks
        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->paginate(10)
            ->onEachSide(1);
        $activeTasks = TaskResource::collection($activeTasks);

        return inertia(
            'Dashboard/Index',
            compact(
                'totalPendingTasks', 
                'totalCompletedTasks', 
                'totalInProgressTasks', 
                'myPendingTasks', 
                'myCompletedTasks', 
                'myInProgressTasks',
                'activeTasks'
            ));
    }
}
