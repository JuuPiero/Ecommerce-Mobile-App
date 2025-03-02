@extends('admin.layouts._masterLayout')
@section('head')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')
<div class="container-fluid">
    <div class="block">
        @if(session('message'))
            <div class="alert alert-success">{{ session('message') }}</div>
        @endif
        <div class="title"><strong>Categories</strong></div>
        <a href="{{ route('admin.category.create') }}" class="btn btn-primary text-black">Add new</a>
        @if (count($categories))
            <div class="table-responsive"> 
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Preview</th>
                            <th>Products</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                <tbody>
                    @foreach ($categories as $category)
                        @include('admin.category._categoryRow', ['category' => $category, 'name' => $category->name])
                    @endforeach
                </tbody>
                </table>
            </div>
            {{ $categories->render('admin.layouts._paginate') }}
        @endif
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('custom/admin/js/deleteRow.js') }}"></script>
<script>
$(".delete-btn").click(e => {
    const itemId = e.target.getAttribute('data-id')
    deleteRow(itemId, 'categories')
    $('#row-' + itemId).remove()
});
</script>
@endsection