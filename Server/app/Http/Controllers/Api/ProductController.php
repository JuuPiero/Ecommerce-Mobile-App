<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Repositories\Product\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    private $productRepository;

    public function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function index() {
        $products = $this->productRepository->paginate(10);

        return response()->json($products);
        // return view('admin.product.index', compact('products'));
    }

    public function create(Request $request) {
        $t = $this->productRepository->create($request);
        //Log::info('Debug info:', ['data' => $request->all()]);

        
        return response()->json([
            'message' => "ok",
            "data" => $t
        ]);
    }

    public function edit($id) {
        $product = $this->productRepository->find($id);
        $categories = Category::where('parent_id', 0)->get();
        // array of category's id of product
        $productCategories = [];

        foreach ($product->categories as $category) {
            $productCategories[] = $category->id;
        }
        return view('admin.product.edit')->with([
            'product' => $product,
            'productCategories' => $productCategories,
            'categories' => $categories
        ]);
    }

    public function update($id, Request $request) {
        $request->validate([
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $this->productRepository->update($id, $request);
        // return redirect()->back()->with('message', 'tạo thành công');
        return redirect()->route('admin.product')->with([
            'message' => 'cập nhật thành công'
        ]);
    }

    public function delete($id) {
        try {
            $this->productRepository->delete($id);
            return response()->json(['message' => 'Item deleted successfully']);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()]);
        }
    }
}
