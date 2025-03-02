<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Đăng nhập thất bại',
                'error' => 'Unauthorized']
            , 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'token' => $token,
            'user' => Auth::user(),
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function signup(SignupRequest $request) {
        $user = $this->userRepository->create($request->all());
        $token = JWTAuth::fromUser($user);
        // Mail::to($user->email)->send(new NotificationMail('User successfully registered'));
        return response()->json([
            'success' => true,
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token,
        ], 201);
    }


    public function me()
    {
        return response()->json(Auth::user());
    }
}
