<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index() {

        $transactions = Transaction::orderByDesc('created_at')->paginate(10);
        return view('admin.transaction.index')->with([
            'transactions' => $transactions
        ]);
    }
}
