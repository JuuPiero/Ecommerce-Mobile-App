<?php

namespace App\Http\Controllers\Client;

use App\Extensions\Cart;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\Product\ProductRepository;
use Illuminate\Http\Request;

class CartController extends Controller {
    private $productRepository;

    public function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function index() {
        // Cart::clean();
        $cart = Cart::getCart();
        $items = [];
        foreach ($cart as $productId => $quantity) {
            $product = $this->productRepository->find($productId);
            if($product != null) {
                array_push($items, [
                    'product' => $product,
                    'quantity' => $quantity
                ]);
            }
        }
        return view('client.cart.index')->with([
            'cart' => $cart,
            'items' => $items
        ]); 
    }


    public function add($productId, $quantity = 1) {
        try {
            Cart::addToCart($productId, $quantity);
            return response()->json([
                'message' => 'thêm thành công'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => $th->getMessage()
            ]);
        }
        
    }

    public function remove($productId) {
        Cart::removeFromCart($productId);

        return redirect()->back()->with([
            'message' => 'xóa thành công'
        ]);
    }

}
