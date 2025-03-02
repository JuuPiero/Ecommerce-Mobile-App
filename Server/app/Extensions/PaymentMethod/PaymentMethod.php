<?php 
namespace App\Extensions\PaymentMethod;

use ReflectionClass;

class PaymentMethod {
    const CAST_PAYMENT = 'CAST PAYMENT';
    const MOMO = 'MOMO';
    const VNPAY = 'VNPAY';
    static function getMethods() {
        $oClass = new ReflectionClass(__CLASS__);
        return $oClass->getConstants();
    }
}