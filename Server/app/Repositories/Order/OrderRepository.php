<?php 
namespace App\Repositories\Order;

use App\Repositories\IRepository;

use App\Extensions\Cart;
use App\Extensions\Order\OrderStatus;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Product\ProductRepository;

class OrderRepository implements IRepository {
    private $productRepository;

    public function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function all() {
        
    }
    public function allOrderOfUser($userId) {
        $orders = Order::where('user_id', $userId)->paginate(15);
        return $orders;
    }
    public function paginate($perPage = 10, $status = null) {
        $orders = Order::orderByDesc('created_at')->paginate($perPage);
        if($status) {
            $orders = Order::orderByDesc('created_at')
            ->where('status', $status)
            ->paginate($perPage);
        }
        return $orders;
    }

    public function find($id) {
        return $order = Order::with('order_items')->findOrFail($id);
    }

    public function create($request) {
        $data = $request->all();

        $order = Order::create([
            'user_id' => Auth::user()->id,
            'status' => OrderStatus::PENDING,
            ...$data,
            'address' => $data['city'] . ' ' . $data['address'],
        ]);

        $cart = Cart::getCart();
        foreach ($cart as $productId => $quantity) {
            $product =  $this->productRepository->find($productId);
            if($quantity > $product->quantity) {
                return false;
            }           
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $quantity,
                'product_price' => $quantity * $product->price,
                'product_sku' => $product->sku
            ]);
            $product->update([
                'quantity' => $product->quantity - $quantity,
            ]);
            
        }
        //đặt xong thì xóa giỏ
        return $order;
        // create transaction
        // Transaction::create();
    }

    public function update($id, $data) {

    }

    public function delete($id) {
        
    }

    
}
