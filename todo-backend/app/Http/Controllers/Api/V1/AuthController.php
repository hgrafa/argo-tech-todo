<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginUserRequest;
use App\Http\Requests\V1\RegisterUserRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Auhtorization endpoints"
 * )
 * @OA\Schema(
 *      schema="LoginUserRequest",
 *      required={"email", "password"},
 *      @OA\Property(
 *          property="email",
 *          type="string",
 *          format="email",
 *          description="The email of the user"
 *      ),
 *      @OA\Property(
 *          property="password",
 *          type="string",
 *          format="password",
 *          description="The password of the user"
 *      )
 *  )
 * @OA\Schema(
 *      schema="RegisterUserRequest",
 *      required={"name", "email", "password"},
 *      @OA\Property(
 *          property="name",
 *          type="string",
 *          description="The name of the user"
 *      ),
 *      @OA\Property(
 *          property="email",
 *          type="string",
 *          format="email",
 *          description="The email of the user"
 *      ),
 *      @OA\Property(
 *          property="password",
 *          type="string",
 *          format="password",
 *          description="The password of the user"
 *      )
 *  )
 * @OA\Schema(
 *      schema="User",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The ID of the user"
 *      ),
 *      @OA\Property(
 *          property="name",
 *          type="string",
 *          description="The name of the user"
 *      ),
 *      @OA\Property(
 *          property="email",
 *          type="string",
 *          format="email",
 *          description="The email of the user"
 *      )
 *  )
 * @OA\Schema(
 *     schema="ValidationError",
 *     @OA\Property(
 *          property="message",
 *          type="string",
 *          description="The error message"
 *    ),
 *     @OA\Property(
 *          property="errors",
 *          type="object",
 *          description="The validation errors"
 *   )
 * )
 */
class AuthController extends Controller
{

    /**
     * @OA\Post(
     *     path="/register",
     *     tags={"Auth"},
     *     summary="Register a new user",
     *     security={{"bearerAuth": {}}},
     *     operationId="register",
     *     @OA\RequestBody(
     *         description="User data",
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/RegisterUserRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User registered successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *    @OA\Response(
     *         response=422,
     *         description="Validation error",
     *        @OA\JsonContent(ref="#/components/schemas/ValidationError")
     *     )
     * )
     */
    public function register(RegisterUserRequest $request)
    {
        $user = User::create($request->all());

        return response()->json([
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/login",
     *     tags={"Auth"},
     *     summary="Login a user",
     *     security={{"bearerAuth": {}}},
     *     operationId="login",
     *     @OA\RequestBody(
     *         description="User credentials",
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/LoginUserRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User logged in successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *         @OA\JsonContent(ref="#/components/schemas/ValidationError")
     *    ),
     *    @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(ref="#/components/schemas/ValidationError")
     *   )
     * )
     */
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
            "accessToken" => $accessToken,
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
            ],
        ]);
    }

    /**
     * @OA\Get(
     *     path="/user/data",
     *     tags={"Auth"},
     *     summary="Get the authenticated user",
     *     operationId="getUser",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="User data",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */
    public function getUser(Request $request)
    {
        $user = $request->user();

        if ($user) return response()->json(new UserResource($user));

        return response()->json(['error' => 'Not logged in'], 401);
    }

    /**
     * @OA\Post(
     *     path="/logout",
     *     tags={"Auth"},
     *     summary="Logout the authenticated user",
     *     operationId="logout",
     *     security={{"Bearer":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="User logged out successfully",
     *     )
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
