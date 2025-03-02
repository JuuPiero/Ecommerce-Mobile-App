<?php

namespace App\Http\Controllers\Admin;

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
        return view('admin.order.index')->with([
            'orders' => $orders,
            'orderStatus' => $orderStatus,
            'statusFilter' => $status
        ]);
    }

    public function detail($id) {
        $order = Order::with('user')->with('order_items')->findOrFail($id);
        $orderItems = OrderItem::where('order_id', $id)->get();
        $orderStatus = OrderStatus::getStatus();
        return view('admin.order.detail')->with([
            'order' => $order,
            'orderItems' => $orderItems,
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
