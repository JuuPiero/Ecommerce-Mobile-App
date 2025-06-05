<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RevenueReportExport implements FromCollection,  WithHeadings
{
  
    protected $fromDate;
    protected $toDate;

    public function __construct($fromDate, $toDate)
    {
        $this->fromDate = $fromDate;
        $this->toDate = $toDate;
    }

    public function collection()
    {
        return Order::select('id', 'name', 'total_amount', 'created_at')
            // ->whereBetween('created_at', [$this->fromDate, $this->toDate])
            ->orderBy('created_at', 'desc')
            ->get();
    }


    public function headings(): array
    {
        return ['ID', 'Customer', 'Total Amount', 'Order Date'];
    }
}
