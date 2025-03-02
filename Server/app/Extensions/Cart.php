<?php 

namespace App\Extensions;

use App\Models\Product;
use Illuminate\Support\Facades\Session;

class Cart {
    const CART_KEY = 'cart';

    public static function getCart() {
        if (!Session::has(self::CART_KEY)) {
            Session::put(self::CART_KEY, []);
        }
        return Session::get(self::CART_KEY);
    }

   
    public static function addToCart($productId, $quantity = 1) {
        $cart = self::getCart();
        if (array_key_exists($productId, $cart)) {
            // Nếu đã tồn tại, cập nhật số lượng
            $cart[$productId] += $quantity;
        } else {
            // Nếu chưa tồn tại, thêm mới sản phẩm vào giỏ hàng
            $cart[$productId] = $quantity;
        }
        // Lưu thông tin giỏ hàng mới vào session
        Session::put(self::CART_KEY, $cart);
    }

    public static function removeFromCart($productId) {
        // Lấy thông tin giỏ hàng từ session
        $cart = self::getCart();
        // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không
        if (array_key_exists($productId, $cart)) {
            // Nếu tồn tại, xóa sản phẩm khỏi giỏ hàng
            unset($cart[$productId]);

            // Cập nhật thông tin giỏ hàng mới vào session
            Session::put(self::CART_KEY, $cart);
        }

    }

    public static function clean() {
        Session::put(self::CART_KEY, []);
    }
    public static function getQuantity() {
        return array_sum(self::getCart());
    }

    public static function getTotalPrice() {
        $cart = self::getCart();
        $totalPrice = 0;
        foreach ($cart as $productId => $quantity) {
            $product = Product::find($productId);
            $totalPrice += $product->price * $quantity;
            // dd($totalPrice);
        }
        return $totalPrice;
    }
}