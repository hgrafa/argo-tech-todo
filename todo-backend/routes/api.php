<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\TodoController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'v1',
        'namespace' => 'App\Http\Controllers\Api\V1'
    ],
    function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    }
);

Route::group(
    [
        'prefix' => 'v1',
        'namespace' => 'App\Http\Controllers\Api\V1',
        'middleware' => 'auth:sanctum'
    ],
    function () {
        Route::apiResource('todos', TodoController::class);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user/data', [AuthController::class, 'getUser']);
    }
);
