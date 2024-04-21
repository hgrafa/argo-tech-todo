<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreTodoRequest;
use App\Http\Requests\V1\UpdateTodoRequest;
use App\Http\Resources\V1\TodoCollection;
use App\Http\Resources\V1\TodoResource;
use App\Models\Todo;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * @OA\Server(url="http://localhost:8000/api/v1")
 * @OA\Tag(
 *     name="Todos",
 *     description="Todo CRUD Endpoints"
 * )
 */
class TodoController extends Controller
{

    /**
     * @OA\Get(
     *     path="/todos",
     *     tags={"Todos"},
     *     summary="Display a listing of todos.",
     *     description="Get all todos from the database.",
     *     @OA\Response(response="200", description="Display a listing of todos.")
     * )
     */
    public function index()
    {
        $user = auth()->user();
        $todos = $user->todos()->paginate();
        return new TodoCollection($todos);
    }

    /**
     *
     */
    public function store(StoreTodoRequest $request)
    {
        $todo = $request->user()->todos()->create($request->all());
        return response()->json(['message' => 'Todo created successfully'], 201);
    }

    /**
     * @OA\Get(
     *     path="/todos/{todo_id}",
     *     tags={"Todos"},
     *     summary="Display the specified todo.",
     *     description="Get the specified todo from the database.",
     *     @OA\Response(response="200", description="Display the specified todo."),
     *     @OA\Response(response="404", description="Todo not found."),
     *     @OA\Response(response="403", description="Forbidden."),
     *     @OA\Parameter(
     *     name="todo_id",
     *     in="path",
     *     required=true,
     *     )
     * )
     */
    public function show($id)
    {
        try {
            $todo = Todo::findOrFail($id);

            if($todo->user_id !== auth()->id()) {
                return response()->json(['message' => 'Forbidden'], 403);
            }

            return new TodoResource($todo);
        } catch (ModelNotFoundException) {
            return response()->json(['error' => 'Todo not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, $id)
    {
        $todo = $request->user()->todos()->findOrFail($id);
        $todo->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $todo = Todo::findOrFail($id);
            $todo->deleteOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Todo not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete the Todo'], 500);
        }

        return response()->json(['message' => 'Todo deleted successfully']);
    }
}
