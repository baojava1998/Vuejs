<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginControllerRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(LoginControllerRequest $request)
    {
        try {
            $credentials = request(['email', 'password']);

            $user = User::where('email', $request->email)->first();

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status_code' => 401,
                    'message' => 'Unauthorized'
                ], 401);
            }
            $tokenResult = $user->createToken('authToken', ['server:update'])->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token' => explode('|',$tokenResult)[1],
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in Login',
                'error' => $error,
            ], 500);
        }
    }

    public function info()
    {
        return Auth::user()->tokens;
    }
}
