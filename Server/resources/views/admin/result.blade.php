@extends('admin.layouts._masterLayout')

@section('content')
<div class="container-fluid">
    <div class="block">
        <h2>Keyword: <span style="color: chartreuse">{{$_GET['keyword']}}</span></h2>
    </div>
    @if (count($categories))
        <div class="block">
            <div class="title"><strong>Categories</strong></div>
            <div class="table-responsive"> 
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Preview</th>
                            <th>Is Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($categories as $category)
                            <tr>
                                <th scope="row">{{ $category->id }}</th>
                                <td>{{$category->name}}</td>
                                <td><img style="width: 80px; height: 40px; object-fit: cover" src="{{ asset('uploads/category/' . $category->images[0]->name) }}" alt="" srcset=""></td>
                                <td>{{ $category->is_active ? 'true' : 'false'}}</td>
                                <td>
                                    <a href="{{ route('admin.category.edit', $category->id) }}" class="btn btn-primary text-black">Edit</a>
                                    <a href="{{ route('admin.category.delete', $category->id) }}" class="btn btn-secondary delete-btn text-black">Delete</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
   

    @if (count($products))
        <div class="block">
            <div class="title"><strong>Products</strong></div>
            <div class="table-responsive"> 
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Category</th>
      
                      <th>Price</th>
                      <th>Is Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach ($products as $product)
                      <tr>
                        <th scope="row">{{ $product->id }}</th>
                        <td>{{ $product->name }}</td>
                        <td><img style="width: 80px; height: 40px; object-fit: cover" src="{{ asset('uploads/product/' . $product->images[0]->name) }}" alt="" srcset=""></td>
                        <td>
                          @foreach ($product->categories as $category)
                            {{ $category->name }}, 
                          @endforeach
                        </td>
                        <td>{{ $product->price}}</td>
                        <td>{{ $product->is_active ? 'true' : 'false'}}</td>
                        <td>
                          <a href="{{ route('admin.product.edit', $product->id) }}" class="btn btn-primary text-black">Edit</a>
                          <a href="{{ route('admin.product.delete', $product->id) }}" class="btn btn-secondary text-black delete-btn">Delete</a>
                          {{-- <button data-id="{{ $product->id}}" class="btn btn-secondary text-black delete-btn">Delete</button> --}}
      
                        </td>
                      </tr>
                    @endforeach
                  </tbody>
                </table>
              </div>
        
        </div>
    @endif
    
</div>
    
@endsection
@section('scripts')
<script>
 
</script>
@endsection