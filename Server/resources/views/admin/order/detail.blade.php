@extends('admin.layouts._masterLayout')

@section('content')
<div class="container-fluid">
    <a href="{{ route('admin.invoice.create', $order->id) }}" class="btn btn-primary text-black mb-2">Print Invoice</a>
    <a href="{{ route('admin.invoice.show', $order->id) }}" class="btn btn-primary text-black mb-2">Show Invoice</a>

    <div class="block">
        @if(session('message'))
            <div class="alert alert-success">
                {{ session('message') }}
            </div>
        @endif
        <div class="title"><strong>Order-{{ $order->id }}</strong></div>
        <p><strong>User order : </strong> <a href="{{route('admin.user.detail', $order->user->id)}}">{{  $order->user->email . ' - ' . $order->user->first_name . ' ' . $order->user->last_name}}</a></p>
        <p><strong>Receiver Name : </strong> {{ $order->first_name . ' ' . $order->last_name }}</p>
        <p><strong>Phone Number : </strong> {{ $order->phone_number }}</p>
        <strong>Address :</strong>
        <p>{{ $order->address }}</p>
        <strong>Note:</strong>
        <p>{{ $order->note }}</p>
        <h3>Total Amount</h3>
        <p><strong>{{ $order->total_amount }}</strong>₫</p>
        <div class="title"><strong>Order Items</strong></div>
        <div class="table-responsive"> 
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($orderItems as $item)
                        <tr>
                            <td>{{ $item->product_sku }}</td>
                            @if ($item->product != null)
                                <td>{{ $item->product_name }} 
                                    @foreach ($item->product->attributes as $attribute)
                                        {{$attribute->name . ' : ' .  $attribute->value}}
                                    @endforeach
                                </td>
                            @else
                                <td>{{ $item->product_name }}</td>
                            @endif
                            <td>{{ $item->quantity }}</td>
                            <td>{{ $item->product_price }}₫</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
     
    </div>
    <div class="block">
        <form
            style="margin-top: 20px"
            class="form-horizontal" method="POST" action="{{ route('admin.order.update', $order->id) }}" >
            @csrf
            <div class="line"></div>
            @if($order->status == $orderStatus['COMPLETED'])
                <div class="form-group row">
                    <h3 class="col-sm-3 form-control-label">Status</h3>
                    <div class="col-sm-3">
                        <input value="COMPLETE" disabled readonly type="text" class="form-control is-valid">
                    </div>
                </div>
            @else
                <div class="form-group row">
                    <h3 class="col-sm-3 form-control-label">Status</h3>
                    <div class="col-sm-3">
                        <select name="status" class="form-control is-invalid">
                            {{-- <option value="1">COMPLETE</option> --}}
                            @foreach ($orderStatus as $status)
                                <option {{$status == $order->status ? 'selected' : ''}} value="{{$status}}">{{$status}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <div class="col-sm-9 ml-auto">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            @endif
        </form>
    </div>
</div>  


@endsection