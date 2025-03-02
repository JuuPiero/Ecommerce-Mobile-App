<option value="{{ $category->id }}">{{ $name }}</option>

@if (count($category->children))
    @foreach ($category->children as $child)
        @include('admin.product._categoryCreateForm', ['category' => $child, 
                                                    'name' => $name . ' > ' . $child->name,
                                                ])
    @endforeach
@endif