@extends('client.layouts._masterLayout')

@section('content')
<!--Page Title-->
<div class="page section-header text-center">
    <div class="page-title">
        <div class="wrapper"><h1 class="page-width">Đơn mua</h1></div>
      </div>
</div>
<!--End Page Title-->

<div class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
            @foreach ($orders as $index => $order)
                <a href="{{route('user.purchase.order', $order->id)}}" class="card purchase" style="text-decoration: none;">
                    <h2 class="mr-2" style="border-bottom: 1px solid grey; padding: 10px 0; text-align: end; color: #26aa99;"><span class="mr-4 h6">{{ timeAgo($order->created_at) }}</span><strong>Status: {{$order->status}}</strong></h2>
                    @foreach ($order->order_items as $orderItem)
                        <div class="item" style="padding: 12px 10px;">
                            <h3>{{ $orderItem->product_name }}<span> x{{$orderItem->quantity}}</span></h3>
                            <p>Price: {{$orderItem->product_price}}đ</p>
                        </div>
                    @endforeach
                    <h2 class="mr-2" style="text-align: end;">Thành tiền: <strong>{{$order->total_amount}}đ</strong></h2>
                </a>
            @endforeach

            {{$orders->render('admin.layouts._paginate') }}
        </div>
    </div>
</div>


@endsection