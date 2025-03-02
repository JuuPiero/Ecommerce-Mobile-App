@extends('admin.layouts._masterLayout')

@section('content')
<div class="container-fluid">
  <form class="form-horizontal filter-form " method="GET" action="{{ route('admin.order') }}">
    <div class="form-group row flex-row-reverse">
        <div class="col-sm-3 ">
          <select name="status" class="form-control order-status-input">
            <option value="">All</option>
            @foreach ($orderStatus as $status)
                <option {{$status == $statusFilter ? 'selected' : ''}} value="{{$status}}">{{$status}}</option>
            @endforeach
          </select>
        </div>
      </div>
  </form>
  <div class="block">
      <div class="title"><strong>Orders</strong></div>
      {{-- <a href="{{ route('admin.product.create') }}" class="btn btn-primary text-black">Add new</a> --}}
      <div class="table-responsive"> 
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Receiver Name</th>
              <th>Phone Number</th>
              <th>Total Amount</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            @foreach ($orders as $order)
              <tr>
                <th scope="row">{{ $order->id }}</th>
                <td>{{ $order->email }}</td>
                <td>{{ $order->first_name . ' ' . $order->last_name }}</td>

                <td>{{ $order->phone_number }}</td>
                <td>{{ $order->total_amount }}₫</td>
                <td>{{ timeAgo($order->created_at) }}</td>

                <td ><span style="border-radius: 4px" class="order-status text-black">{{ $order->status }}</span></td>
                <td>
                  <a href="{{ route('admin.order.detail', $order->id) }}" class="btn btn-primary text-black">Detail</a>
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
      {{ $orders->render('admin.layouts._paginate') }}

  </div>
</div>

    
@endsection

@section('scripts')
<script>
  const statusColors = {
    'Pending': '#FFA500',
    'Processing': '#FFD700',
    'Shipped': '#008000',
    'Completed': '#00FF19',
    'Canceled': '#FF0000'
  };
  const orderStatusEl = document.querySelectorAll('.order-status')

  orderStatusEl.forEach(element => {
    Object.keys(statusColors).forEach(color => {
      if (element.textContent === color) {
        element.style.backgroundColor = statusColors[color];
        // element.height = 'fit-content';
      }
    })
  });
</script>
<script>
  const filterFormElement = document.querySelector('.filter-form')
  const statusInputElement = document.querySelector('.order-status-input')
  statusInputElement.addEventListener('change', e => {
    filterFormElement.submit()
  })
</script>
@endsection