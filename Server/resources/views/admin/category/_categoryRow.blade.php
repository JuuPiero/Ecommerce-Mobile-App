<tr id="row-{{ $category->id }}" >
    <th scope="row">{{ $category->id }}</th>
    <td>{{$name ?? $category->name }}</td>
    <td><img style="width: 80px; height: 40px; object-fit: cover" src="{{ asset('uploads/category/' . $category->images[0]->name) }}" alt="" srcset=""></td>
    <td>{{ $category->products->count() }}</td>
    {{-- <td>{{ $category->is_active ? 'true' : 'false'}}</td> --}}
    <td class="text-center"><span class="dot {{ $category->is_active ? 'dot-green' : 'dot-red'}}"></span></td>
    <td>
        <a href="{{ route('admin.category.edit', $category->id) }}" class="btn btn-primary text-black">Edit</a>
        <button data-id="{{ $category->id}}" class="btn btn-secondary text-black delete-btn">Delete</button>
    </td>
</tr>
@if ($category->children->count())
    @foreach ($category->children as $child)
        @include('admin.category._categoryRow', ['category' => $child, 'name' => $name . ' > ' . $child->name])
    @endforeach
@endif