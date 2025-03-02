<?php

namespace App\Http\Controllers\Client;

use App\Repositories\Product\ProductRepository;
use App\Repositories\Order\OrderRepository;
use App\Extensions\Cart;
use App\Extensions\Order\OrderStatus;
use App\Extensions\PaymentMethod\Momo;
use App\Extensions\PaymentMethod\PaymentMethod;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class CheckoutController extends Controller {
    private $productRepository;
    private $orderRepository;

    public function __construct(ProductRepository $productRepository, OrderRepository $orderRepository) {
        $this->productRepository = $productRepository;
        $this->orderRepository = $orderRepository;

    }
    public function index() {
        $paymentMethods = PaymentMethod::getMethods();
        $cart = Cart::getCart();
        if(count($cart) < 1) return redirect(route('home'));
        $totalPrice = Cart::getTotalPrice();
        $items = [];
        foreach ($cart as $productId => $quantity) {
            $product = $this->productRepository->find($productId);
            array_push($items, [
                'product' => $product,
                'quantity' => $quantity
            ]);
        }

        return view('client.checkout.index')->with([
            'cart' => $cart,
            'items' => $items,
            'totalPrice' => $totalPrice ,
            'paymentMethods' => $paymentMethods
        ]);
    }
    //momo
    public function momoCheckout(Request $request) {
        $data = $request->all();
        $order = $this->orderRepository->create($request);
        $data['order_id'] = $order->id;      
        Momo::createPaymentQr($data);
    }

    public function momoReturn(Request $request) {
        $data = $request->all();
        $status = $data["resultCode"];
        $data = [
            'order_id' => strtok($data['orderId'], '_'),
            'transaction_id' => $data['transId']  ?? '',
            'amount' => $data['amount'],
            'status' => $data['message'],
            'payment_method' => $data['orderType'],
            'payment_gateway_response' => $data['orderInfo']  ?? ''
        ];
        Transaction::create($data);
        if($status == 0) {
            $order = Order::findOrFail($data['order_id']);
            $order->update([
               'status' => OrderStatus::PROCESSING,
            ]);
        }

        Cart::clean();
        return redirect(route('home'))->with([
            'message' => 'đặt hàng thành công'
        ]);
    }


    // Cash payment
    public function checkout(Request $request) {
        // Mail::send('mail.checkout', compact('cart'), function($email) {
        //     $email->subject('Boleto-cart');
        //     $email->to(Auth::user()->email);
        // });
        $this->orderRepository->create($request);
        Cart::clean();
        // Session::put('cart', []);
        return redirect(route('home'))->with([
            'message' => 'đặt hàng thành công'
        ]);
    }
}
