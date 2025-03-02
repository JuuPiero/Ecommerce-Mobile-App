<nav class="grid__item" id="AccessibleNav"><!-- for mobile -->
    <ul id="siteNav" class="site-nav medium center hidearrow">
        <li class="lvl1"><a href="{{route('home')}}"><b>Home</b> <i class="anm anm-angle-down-l"></i></a></li>
        
        @foreach ($categories as $category)
            @include('client.layouts._categoryItem', ['category' => $category])
        @endforeach

        {{-- <li class="lvl1">
            <a href="#"><b>Contact</b> <i class="anm anm-angle-down-l"></i></a>
        </li> --}}
    </ul>
</nav>