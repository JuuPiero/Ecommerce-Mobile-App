<?php 

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StatisticalController {
    public function revenue()
    {
        $start = Carbon::now()->startOfYear();
        $end = Carbon::now()->endOfYear();

        $revenues = Order::selectRaw('MONTH(created_at) as month, SUM(total_amount) as total')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->keyBy('month');

        // Gán giá trị theo thứ tự tháng 1-12, không có thì gán = 0
        $labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 
                   'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
        
        $data = [];
        for ($i = 1; $i <= 12; $i++) {
            $data[] = isset($revenues[$i]) ? (float) $revenues[$i]->total : 0;
        }

        return response()->json([
            'labels' => $labels,
            'datasets' => [
                ['data' => $data]
            ]
        ]);
    }
}