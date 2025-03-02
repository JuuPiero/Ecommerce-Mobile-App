<?php

namespace App\Http\Controllers\Admin;

use App\Extensions\Order\OrderStatus;
use App\Extensions\PaymentMethod\PaymentMethod;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Product\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller {
    private $productRepository;
    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository, ProductRepository $productRepository) {
        $this->categoryRepository = $categoryRepository;
        $this->productRepository = $productRepository;
    }

    public function index() {
        $userCount = User::count();
        $products = Product::all();
        $categories = Category::all();
        $newOrderCount = Order::where('status', OrderStatus::PENDING)->count();
        return view('admin.index')->with([
            'userCount' => $userCount,
            'products' => $products,
            'categories' => $categories,
            'newOrderCount' => $newOrderCount
        ]);
    }

    public function login() {
        return view('admin.login');
    }

    public function checkLogin(Request $request) {
        $credentials  = $request->only('email', 'password');
        $remember = !empty($request->only('remember'));

        if(Auth::guard('admin')->attempt($credentials, $remember)) {
            return redirect(route('admin'));
        }
        
        return back()->withErrors([
            'error' => 'Thông tin đăng nhập không hợp lệ.',
        ]);
    }

    public function logout() {
        Auth::guard('admin')->logout();
        return redirect(route('admin.login'));
    }


    public function search(Request $request) {
        $categories = $this->categoryRepository->searchPrivate($request->keyword);
        $products = $this->productRepository->searchPrivate($request->keyword);
        
        return view('admin.result')->with([
            'categories' => $categories,
            'products' => $products
        ]);
    }

   

}
