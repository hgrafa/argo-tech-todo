<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginUserRequest;
use App\Http\Requests\V1\RegisterUserRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request) {
        $user = User::create($request->all());
        $accessToken = $user->createToken("authToken")->plainTextToken;

        return response()->json([
            "user" => new UserResource($user),
            "access_token" => $accessToken,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(LoginUserRequest $request)
    {
        $user = User::where("email", $request->email)->first();

        if (!$user || !\Hash::check($request->password, $user->password)) {
            return response()->json([
                "message" => "Invalid credentials"
            ], 401);
        }

        $accessToken = $user->createToken("authToken")->plainTextToken;

        return response()->json([
            "user" => new UserResource($user),
            "access_token" => $accessToken,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
