<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

Route::middleware('jwt.auth')->group(function () {
    // Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('/category/create', [CategoryController::class, 'create']);
    Route::put('category/update/{id}', [CategoryController::class, 'update']);
    Route::delete('category/delete/{id}', [CategoryController::class, 'delete']);

    // Route::get('/event/list', [EventController::class, 'list']);
   

  

    // Route::get('/statistical', [UserController::class, 'statistical']);

});


//_______________________________TEST_______________________________
// Route::get('/blog/get/{id}', [BlogController::class, 'get']);
// Route::get('/event/get/{id}', [EventController::class, 'get']);

//________________________________________________________________





Route::prefix('user')->middleware('jwt.auth')
// ->middleware('auth.admin')
->group(function (){
    // Route::post('/{id}', [AuthController::class, 'logout']);
    // Route::get('list', [UserController::class, 'index']);
    // Route::post('create', [UserController::class, 'create']);
    // Route::put('update/{id}', [UserController::class, 'update']);
    // Route::delete('delete/{id}', [UserController::class, 'delete']);
    // Route::get('{id}', [UserController::class, 'get']);

});



// Route::get('user/findByEmail', function($request) {
//     $user = User::where('email', $request->email)->first();
//     if ($user) {
//         return response()->json($user);
//     }
//     return response()->json([
//         'message' => 'User not found'
//     ], 404);
// });
