<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreTodoRequest;
use App\Http\Requests\V1\UpdateTodoRequest;
use App\Http\Resources\V1\TodoCollection;
use App\Http\Resources\V1\TodoResource;
use App\Models\Todo;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * @OA\Server(url="http://localhost:8000/api/v1")
 * @OA\Tag(
 *     name="Todos",
 *     description="Todo API Endpoints"
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
        return new TodoCollection(Todo::paginate());
    }

    /**
     *
     */
    public function store(StoreTodoRequest $request)
    {
        return new TodoResource(Todo::create($request->all()));
    }

    /**
     * @OA\Get(
     *     path="/todos/{todo_id}",
     *     tags={"Todos"},
     *     summary="Display the specified todo.",
     *     description="Get the specified todo from the database.",
     *     @OA\Response(response="200", description="Display the specified todo."),
     *     @OA\Response(response="404", description="Todo not found."),
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
            return new TodoResource($todo);
        } catch (ModelNotFoundException) {
            return response()->json(['error' => 'Todo not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $todo->update($request->all());
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
