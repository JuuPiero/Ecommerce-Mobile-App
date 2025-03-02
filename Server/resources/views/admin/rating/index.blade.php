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
        <div class="title"><strong>Ratings</strong></div>
        @if (count($ratings))
          <div class="table-responsive"> 
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Comment</th>
                  <th>Product</th>
                  <th>Star</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @foreach ($ratings as $rating)
                  <tr id="row-{{ $rating->id }}" >
                    <td><a href="{{route('admin.user.detail', $rating->user->id)}}">{{ $rating->user->first_name . ' ' . $rating->user->last_name }}</a></td>
                    <td class="color-blue">{{$rating->comment}}</td>
                    <td><a href="{{ route('admin.product.edit', $rating->product->id) }}">{{$rating->product->name}}</a></td>
                    <td>{{$rating->rating}} <i class="fas fa-star" style="color: yellow"></i></td>
                    <td>{{ timeAgo($rating->created_at) }}</td>

                    <td>
                        <button data-id="{{ $rating->id}}" class="btn btn-secondary text-black delete-btn">Delete</button>
                    </td>
                  </tr>
                @endforeach
              </tbody>
            </table>
          </div>
          {{ $ratings->render('admin.layouts._paginate') }}
        @endif
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('custom/admin/js/deleteRow.js') }}"></script>
<script>
$(".delete-btn").click(e => {
    const itemId = e.target.getAttribute('data-id')
    deleteRow(itemId, 'ratings')
    $('#row-' + itemId).remove()
});
</script>
@endsection