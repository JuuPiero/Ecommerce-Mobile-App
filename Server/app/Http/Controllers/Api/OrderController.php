<?php

namespace App\Http\Controllers\Api;

use App\Extensions\Order\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Repositories\Order\OrderRepository;
use Illuminate\Http\Request;

class OrderController extends Controller {

    private $orderRepository;

    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function index(Request $request) {
        $status = $request->status;
        $orderStatus = OrderStatus::getStatus();
        $orders =  $this->orderRepository->paginate(8, $status);

        return response()->json([
            'orders' => $orders,
            'orderStatus' => $orderStatus,
            'statusFilter' => $status
        ]);
    }

    public function create(Request $request) {
        $this->orderRepository->create($request);
        
        return response()->json([
            'message' => 'Created order successfully',
        ]);
    }

    public function detail($id) {
        $order = Order::with(['user', 'order_items.product', 'order_items.product.images'])->findOrFail($id);
        $orderStatus = OrderStatus::getStatus();

        return response()->json([
            'order' => $order,
            'invoice_link' => request()->root() . route('admin.invoice.create', $order->id, false),
            'orderStatus' => $orderStatus,
        ]);
    }

    public function update($id, Request $request) {
        $data = $request->all();
        $order = Order::findOrFail($id);
        $order->update($data);
        return redirect()->back()->with([
            'message' => 'đã cập nhật trạng thái đơn hàng'
        ]);
    }

}
