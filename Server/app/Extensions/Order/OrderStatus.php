<?php 
namespace App\Extensions\Order;

use ReflectionClass;

class OrderStatus {
    const PENDING = 'Pending';
    const PROCESSING = 'Processing';
    const SHIPPED = 'Shipped';
    const COMPLETED = 'Completed';
    const CANCELED = 'Cancelled';
    static function getStatus() {
        $oClass = new ReflectionClass(__CLASS__);
        return $oClass->getConstants();
    }

// Pending: Đơn hàng đã được tạo nhưng chưa được xử lý hoặc thanh toán.
// Processing: Đơn hàng đang được xử lý, bao gồm việc xác nhận thông tin và chuẩn bị hàng hóa.
// Shipped: Hàng đã được vận chuyển và đang trong quá trình giao hàng cho người dùng.
// COMPLETED: Hàng đã được giao thành công cho người dùng.
// Canceled: Đơn hàng đã bị hủy trước khi được hoàn thành hoặc giao hàng.
}