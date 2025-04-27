<?php

use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
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

Route::prefix('v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::middleware('jwt.auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
        //__________________DANH MỤC__________________
        // Route::get('/statistical', [UserController::class, 'statistical']);
        Route::get('categories', [CategoryController::class, 'index']);



        // __________________ACCOUNT__________________
        Route::get('users', [AccountController::class, 'index']);

    });

    Route::get('category/all', [CategoryController::class, 'all']);
    Route::get('category/get/{id}', [CategoryController::class, 'get']);
    Route::post('category/create', [CategoryController::class, 'create']);
    Route::delete('category/delete/{id}', [CategoryController::class, 'delete']);
    Route::put('category/update/{id}', [CategoryController::class, 'update']);

    //PRODUCT
    Route::get('products', [ProductController::class, 'index']);
    Route::get('product/get/{id}', [ProductController::class, 'get']);
    Route::post('product/create', [ProductController::class, 'create']);
    Route::delete('product/delete/{id}', [ProductController::class, 'delete']);
    Route::put('product/update/{id}', [ProductController::class, 'update']);


    Route::get('orders', [OrderController::class, 'index']);
    Route::get('order/detail/{id}', [OrderController::class, 'detail']);
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



