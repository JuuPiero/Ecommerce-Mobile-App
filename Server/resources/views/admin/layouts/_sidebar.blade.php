<nav id="sidebar">
    <!-- Sidebar Header-->
    <div class="sidebar-header d-flex align-items-center">
    {{-- <div class="avatar"><img src="{{ asset('uploads/avatar.jpg')}}" alt="..." class="img-fluid rounded-circle"></div> --}}
    <div class="title">
        <h1 class="h5">{{ Auth::guard('admin')->user()->first_name . ' ' . Auth::guard('admin')->user()->last_name }}</h1>
        <p>Admin</p>
    </div>
    </div>
    <!-- Sidebar Navidation Menus--><span class="heading">Main</span>
    <ul class="list-unstyled">
        <li class="active"><a href="{{ route('admin') }}"> <i class="icon-home"></i>Home</a></li>
        <li class=""><a href="{{ route('admin.account') }}"> <i class="icon-user"></i>Account</a></li>

        <li>
            <a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse">
                <i class="icon-windows"></i>
                Categories 
            </a>
            <ul id="exampledropdownDropdown" class="collapse list-unstyled ">
                <li><a href="{{ route('admin.category') }}">List all</a></li>
                <li><a href="{{ route('admin.category.create') }}">Add new</a></li>
            </ul>
        </li>
        <li>
            <a href="#productDropdown" aria-expanded="false" data-toggle="collapse">
                <i class="icon-windows"></i> Products 
            </a>
            <ul id="productDropdown" class="collapse list-unstyled ">
                <li><a href="{{ route('admin.product') }}">List all</a></li>
                <li><a href="{{ route('admin.product.create') }}">Add new</a></li>
            </ul>
        </li>

        <li>
            <a href="{{ route('admin.order') }}"><i class="icon-windows"></i>Orders</a>
        </li>
        <li><a href="{{ route('admin.rating') }}"><i class="fas fa-star"></i>Ratings </a></li>
        <li><a href="{{ route('admin.transaction') }}"><i class="fa-solid fa-rotate"></i></i>Transaction </a></li>
        {{-- <li><a href="{{ route('admin.setting') }}"><i class="icon-settings"></i>Settings </a></li> --}}

    </ul>
</nav>