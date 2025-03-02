<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model {
    use HasFactory;

    protected $table = 'transactions';
    protected $fillable = [
        'order_id',
        'transaction_id',
        'amount',
        'status',
        'payment_method',
        'payment_gateway_response'
    ];

    public function Order()
    {
        return $this->belongsTo(Order::class);
    }
    
}
