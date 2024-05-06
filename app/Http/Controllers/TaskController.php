<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get()->all();
        $users = User::query()->orderBy('name', 'asc')->get()->all();

        return inertia('Tasks/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('task_images', 'public'); // Store in the 'public' disk
            $data['image_path'] = $imagePath; // Add image path to the data array
        }

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Task::create($data);
        return to_route('task.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Tasks/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get()->all();
        $users = User::all();

        return inertia('Tasks/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $data['updated_by'] = Auth::id();

        // Check if there is a new image in the request
        if ($request->hasFile('image')) {
            // If there's an existing image, delete it
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory($task->image_path);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('task_images', 'public');
            $data['image_path'] = $imagePath;
        }

        // Update the task with the new data
        $task->update($data);

        return to_route('task.index')->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();

        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }

        return to_route('task.index')->with('success', "Task \" $name \" was deleted");
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where("assigned_user_id", $user->id);
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
