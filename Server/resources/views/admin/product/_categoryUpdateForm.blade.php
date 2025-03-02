<option {{in_array($category->id, $productCategories) ? 'selected' : ''}} value="{{ $category->id }}">{{ $name }}</option>

@if (count($category->children))
    @foreach ($category->children as $child)
        @include('admin.product._categoryUpdateForm', ['category' => $child, 
                                                    'name' => $name . ' > ' . $child->name])
    @endforeach
@endif