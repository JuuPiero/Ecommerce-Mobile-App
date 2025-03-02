<?php

namespace App\Http\Controllers\Client;

use App\Extensions\Cart;
use App\Extensions\PaymentMethod\PaymentMethod;
use App\Http\Controllers\Controller;
use App\Models\Rating;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Product\ProductRepository;
use Illuminate\Http\Request;

class HomeController extends Controller {
    private $productRepository;
    private $categoryRepository;

    public function __construct(ProductRepository $productRepository, CategoryRepository $categoryRepository) {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }
    public function index() {
        $banners = getBanners();
        // Cart::clean();
        $products = $this->productRepository->paginate();
        return view('client.home.index')->with([
            'products' => $products,
            'banners' => $banners
        ]);
    }

    public function productDetail($id) {
        $product = $this->productRepository->find($id);
        // dd($product->averageRating());
        $ratings = Rating::where('product_id', $id)->orderByDesc('created_at')->paginate(5);
        $suggests = $this->productRepository->getsuggestProducts($id);
        return view('client.product.detail')->with([
            'product' => $product,
            'ratings' => $ratings,
            'suggests' => $suggests
        ]);
    }

    public function category($id) {
        $category = $this->categoryRepository->find($id);
        $categories = $this->categoryRepository->getRootCategories();
        $products = $this->productRepository->getProductsByCategory($id, 12);

        return view('client.category.index')->with([
            'category' => $category,
            'categories' => $categories,
            'products' => $products,
            'brands' => $category->children
        ]);
    }

    public function filter(Request $request) {
        $categories = $this->categoryRepository->getRootCategories();
        $data = $request->all();
        $products = $this->productRepository->filter($data);
        return view('client.filter.index')->with([
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    public function search(Request $request) {
        $products = $this->productRepository->search($request->keywords);
        $categories = $this->categoryRepository->getRootCategories();
        
        return view('client.home.result')->with([
            'products' => $products,
            'categories' => $categories,
        ]);
    }

}
