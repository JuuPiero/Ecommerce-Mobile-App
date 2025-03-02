@extends('admin.layouts._masterLayout')
@section('head')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')
<div class="container-fluid">
  <div class="block">
    @if(session('message'))
      <div class="alert alert-success">
          {{ session('message') }}
      </div>
    @endif
    <div class="title"><strong>Products</strong></div>
    <a href="{{ route('admin.product.create') }}" class="btn btn-primary text-black">Add new</a>
    @if (count($products))
      <div class="table-responsive"> 
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Preview</th>
              <th>Category</th>
              <th>Price</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            @foreach ($products as $product)
              <tr id="row-{{ $product->id }}">
                <th scope="row">{{ $product->id }}</th>
                <td class="w-25">{{ $product->name }}</td>
                <td><img style="width: 80px; height: 40px; object-fit: cover" src="{{ asset('uploads/product/' . $product->images[0]->name) }}" alt="" srcset=""></td>
                <td>
                  @foreach ($product->categories as $category)
                    {{ $category->name }}, 
                  @endforeach
                </td>
                <td>{{ $product->price }}₫</td>
                <td class="text-center"><span class="dot {{ $product->is_active ? 'dot-green' : 'dot-red'}}"></span></td>
                <td>
                  <a href="{{ route('admin.product.edit', $product->id) }}" class="btn btn-primary text-black">Edit</a>
                  {{-- <a href="{{ route('admin.product.delete', $product->id) }}" class="btn btn-secondary text-black delete-btn">Delete</a> --}}
                  <button data-id="{{ $product->id }}" class="btn btn-secondary text-black delete-btn">Delete</button>
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
      {{ $products->render('admin.layouts._paginate') }}
    @endif
  </div>
</div>

    
@endsection

@section('scripts')
<script src="{{ asset('custom/admin/js/deleteRow.js') }}"></script>
<script>
$(".delete-btn").click(e => {
    const itemId = e.target.getAttribute('data-id')
    deleteRow(itemId, 'products')
    $('#row-' + itemId).remove()
});
</script>
@endsection