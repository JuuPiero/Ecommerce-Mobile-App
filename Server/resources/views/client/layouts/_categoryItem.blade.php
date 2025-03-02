<li class="
    {{ $category->parent_id == 0 ? 'lvl1 parent' : '' }}
    {{ $category->children->count() && $category->parent_id == 0 ? 'dropdown' : '' }} ">
    <a href="{{route('home.category', $category->id)}}" class="site-nav">
        {{ $category->name }} 
        @if ($category->children->count())
            <i class="anm anm-angle-down-l"></i>
        @endif
    </a>
    @if ($category->children->count())
        <ul class="dropdown">
            @foreach ($category->children as $child)
                @include('client.layouts._categoryItem', ['category' => $child])
            @endforeach
        </ul>
    @endif
</li>