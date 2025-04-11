<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Repositories\Product\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productRepository;

    public function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function index() {
        $products = $this->productRepository->paginate(10, false);
        return response()->json($products);
    }

    public function get($id) {
        $product =  $this->productRepository->find($id);
        return response()->json([
            'product' => $product,
        ]);
    }

    public function create(Request $request) {
        $product = $this->productRepository->create($request);

        
        return response()->json([
            'message' => "ok",
            'product' => $product
        ]);
    }


    public function update($id, Request $request) {
        $request->validate([
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $product = $this->productRepository->update($id, $request);

        return response()->json([
            'product' => $product,
            'message' => 'Cập nhật thành công'
        ]);
    }

    public function delete($id) {
        try {
            $product = $this->productRepository->delete($id);
            return response()->json([
                'message' => 'Item deleted successfully',
                'product' => $product
            ]);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()]);
        }
    }
}
