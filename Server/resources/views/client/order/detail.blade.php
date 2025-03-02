@extends('client.layouts._masterLayout')

@section('content')
<!--Page Title-->
<div class="page section-header text-center">
    <div class="page-title">
        <div class="wrapper"><h1 class="page-width">Order Detail</h1></div>
      </div>
</div>
<!--End Page Title-->

<div class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
            <h2>Order ID: #{{$order->id}}</h2>
            <p>Created at: {{$order->created_at}}</p>
            <p>Receiver: {{$order->first_name . ' ' . $order->last_name}}</p>
            <p>Phone Number: {{$order->phone_number}}</p>
            <p>Address: {{$order->address}}</p>
            @if ($order->status === 'Processing' || $order->status === 'Pending')
                <div class="actions">
                    <a class="btn btn-primary mb-2" href="{{route('user.cancel.order', $order->id)}}">Hủy Đơn</a>
                </div>
            @endif
           

            <div class="card purchase" style="text-decoration: none;">
                <h2 style="border-bottom: 1px solid grey; padding: 10px 0; text-align: end; color: #26aa99;" class="mr-2">Status: <strong>{{$order->status}}</strong></h2>
                @foreach ($order->order_items as $orderItem)
                    <div class="item" style="padding: 12px 10px;">
                        <h3>{{$orderItem->product_name}}<span> x{{$orderItem->quantity}}</span></h3>
                        <p>Price: {{$orderItem->product_price}}đ</p>
                    </div>
                @endforeach
                <h2 class="mr-2" style="text-align: end;">Thành tiền: <strong>{{$order->total_amount}}đ</strong></h2>
            </div>
        </div>
    </div>
</div>


@endsection