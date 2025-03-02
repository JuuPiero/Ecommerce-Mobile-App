<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RatingController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\CheckoutController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::prefix('/')->group(function() {
//     Route::get('', [HomeController::class, 'index'])->name('home');
//     Route::get('home/search', [HomeController::class, 'search'])->name('home.search');
//     Route::get('category/{id}', [HomeController::class, 'category'])->name('home.category');
//     Route::get('product/detail/{id}', [HomeController::class, 'productDetail'])->name('home.product.detail');
//     // Route::get('product/filter', [HomeController::class, 'filter'])->name('home.product.filter');
//     Route::middleware('auth')->group(function() {
//         Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout');
//         Route::post('checkout', [CheckoutController::class, 'checkout'])->name('checkout.post');

//         Route::post('checkout/momo', [CheckoutController::class, 'momoCheckout'])->name('checkout.momo');
//         Route::get('checkout/momo/return', [CheckoutController::class, 'momoReturn'])->name('checkout.momo.return');

//     });
// });


Route::prefix('user')->group(function() {
    Route::get('login', [UserController::class, 'login'])->name('user.login');
    Route::post('checkLogin', [UserController::class, 'checkLogin'])->name('user.check.login');
    Route::get('register', [UserController::class, 'register'])->name('user.register');
    Route::post('postRegister', [UserController::class, 'postRegister'])->name('user.post.register');
    Route::prefix('/')->middleware('auth')->group(function() {
        Route::get('logout', [UserController::class, 'logout'])->name('user.logout');
        Route::get('account/profile', [UserController::class, 'profile'])->name('user.profile');
        Route::post('profile/update', [UserController::class, 'updateProfie'])->name('user.profile.update');
        Route::get('purchase/order/{id}', [UserController::class, 'orderDetail'])->name('user.purchase.order');
        Route::get('purchase/order/cancel/{id}', [UserController::class, 'cancelOrder'])->name('user.cancel.order');

        Route::get('purchase', [UserController::class, 'purchase'])->name('user.purchase');
        Route::post('create/rating', [UserController::class, 'createRating'])->name('user.create.rating');
        
    });
});
Route::prefix('cart')->group(function() {
    Route::get('', [CartController::class, 'index'])->name('cart');
    Route::get('add/{productId}/{quantity?}', [CartController::class, 'add'])->name('cart.add');
    Route::get('remove/{productId}', [CartController::class, 'remove'])->name('cart.remove');
});


Route::prefix('admin')->group(function () {
    Route::get('login', [AdminController::class, 'login'])->name('admin.login');
    Route::post('checkLogin', [AdminController::class, 'checkLogin'])->name('admin.check.login');

    Route::prefix('/')->middleware('admin.auth')->group(function() {
        Route::get('', [AdminController::class, 'index'])->name('admin');
        Route::get('logout', [AdminController::class, 'logout'])->name('admin.logout');
        Route::get('search', [AdminController::class, 'search'])->name('admin.search');
        // =================================================================
        // Route::get('detail/{id}', [AdminController::class, 'detail'])->name('admin.detail');
        // ===================================================================
        Route::get('store/settings', [SettingController::class, 'index'])->name('admin.setting');

        Route::get('create', [AccountController::class, 'createAdmin'])->name('admin.create');
        Route::post('store', [AccountController::class, 'storeAdmin'])->name('admin.store');
          

        Route::get('accounts', [AccountController::class, 'accounts'])->name('admin.account');
        Route::delete('users/delete/{id}', [AccountController::class, 'deleteUser'])->name('admin.user.delete');

        Route::prefix('user')->group(function() {
            Route::get('detail/{id}', [AccountController::class, 'userDetail'])->name('admin.user.detail');
            Route::post('update/{id}', [AccountController::class, 'updateAccount'])->name('admin.user.update');
        });

        Route::prefix('products')->group(function() {
            Route::get('', [ProductController::class, 'index'])->name('admin.product');
            Route::get('create', [ProductController::class, 'create'])->name('admin.product.create');
            Route::post('store', [ProductController::class, 'store'])->name('admin.product.store');

            Route::get('edit/{id}', [ProductController::class, 'edit'])->name('admin.product.edit');
            Route::post('update/{id}', [ProductController::class, 'update'])->name('admin.product.update');

            // Route::get('delete/{id}', [ProductController::class, 'delete'])->name('admin.product.delete');
            Route::delete('delete/{id}', [ProductController::class, 'delete'])->name('admin.product.delete');
        });

        Route::prefix('categories')->group(function() {
            Route::get('', [CategoryController::class, 'index'])->name('admin.category');
            Route::get('create', [CategoryController::class, 'create'])->name('admin.category.create');
            Route::post('store', [CategoryController::class, 'store'])->name('admin.category.store');
            Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('admin.category.edit');
            Route::post('update/{id}', [CategoryController::class, 'update'])->name('admin.category.update');

            // Route::get('delete/{id}', [CategoryController::class, 'delete'])->name('admin.category.delete');
            Route::delete('delete/{id}', [CategoryController::class, 'delete'])->name('admin.category.delete');
        });

        Route::prefix('orders')->group(function() {
            Route::get('', [OrderController::class, 'index'])->name('admin.order');
            Route::get('detail/{id}', [OrderController::class, 'detail'])->name('admin.order.detail');
            Route::post('update/{id}', [OrderController::class, 'update'])->name('admin.order.update');
        });

        Route::prefix('invoice')->group(function() {
            Route::get('show/{id}', [InvoiceController::class, 'show'])->name('admin.invoice.show');
            Route::get('create/{id}', [InvoiceController::class, 'create'])->name('admin.invoice.create');
        });

        Route::prefix('ratings')->group(function() {
            Route::get('', [RatingController::class, 'index'])->name('admin.rating');
            Route::delete('delete/{id}', [RatingController::class, 'delete'])->name('admin.rating.delete');
        });
        Route::get('transactions', [TransactionController::class, 'index'])->name('admin.transaction');
    });
});

