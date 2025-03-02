<?php

namespace App\Http\Controllers\Admin;

use App\Extensions\Order\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;

class InvoiceController extends Controller {

    public function show($id) {
        $order = Order::findOrFail($id);
        $orderItems = OrderItem::where('order_id', $id)->get();
        $orderStatus = OrderStatus::getStatus();
        // dd($orderItems[0]->product->attributes()->get());
        return view('admin.invoice.index')->with([
            'order' => $order,
            'orderItems' => $orderItems,
            'orderStatus' => $orderStatus
        ]);
    }

    public function create($id) {
        $order = Order::findOrFail($id);
        $orderItems = OrderItem::where('order_id', $id)->get();

        Pdf::setOption(['defaultFont' => 'sans-serif']);
        $invoice = Pdf::loadView('admin.invoice.index', [
            'order' => $order,
            'orderItems' => $orderItems
        ]);

        return $invoice->download('invoice_' . $order->id . '.pdf');
        
    }
}
