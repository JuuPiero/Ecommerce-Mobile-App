<?php

namespace App\Http\Controllers\Api;

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

    public function search(Request $request) {
        $categories = $this->categoryRepository->searchPrivate($request->keywords);
        $products = $this->productRepository->searchPrivate($request->keywords);
        $users = User::where('full_name', 'LIKE', '%' . $request->keywords . '%')
        ->orWhere('email', 'LIKE', '%' . $request->keywords . '%')
        ->paginate(15);

        return response()->json([
            'categories' => $categories,
            'products' => $products,
            'users' => $users
        ]);
    }

}
