@extends('admin.layouts._masterLayout')
@section('head')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')
<div class="container-fluid">
    <div class="block">
        {{-- @if(session('message'))
          <div class="alert alert-success">
              {{ session('message') }}
          </div>
        @endif --}}
        <div class="title"><strong>Transactions</strong></div>
        @if (count($transactions))
          <div class="table-responsive"> 
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Method</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                @foreach ($transactions as $transaction)
                  <tr id="row-{{ $transaction->id }}" >
                    <td><a href="{{route('admin.order.detail', $transaction->order_id)}}">{{ $transaction->order_id }}</a></td>
                    <td>{{ $transaction->transaction_id  }}</td>
                    <td>{{ $transaction->amount }} VNĐ</td>
                    <td>{{ $transaction->status }}</td>
                    <td>{{ $transaction->payment_method }}</td>
                    {{-- <td><a href="{{ route('admin.product.edit', $rating->product->id) }}">{{$rating->product->name}}</a></td> --}}
                    {{-- <td>{{$rating->rating}} <i class="fas fa-star" style="color: yellow"></i></td> --}}
                    <td>{{ $transaction->created_at }}</td>

                    {{-- <td>
                        <button data-id="{{ $rating->id}}" class="btn btn-secondary text-black delete-btn">Delete</button>
                    </td> --}}
                  </tr>
                @endforeach
              </tbody>
            </table>
          </div>
          {{ $transactions->render('admin.layouts._paginate') }}
        @endif
    </div>
</div>
@endsection

@section('scripts')
{{-- <script src="{{ asset('custom/admin/js/deleteRow.js') }}"></script> --}}
<script>

</script>
@endsection